import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import WkAnalyseData from "./WkAnalyseData";
import React from "react";
import "../styles/App.scss";
//import { LaneState } from "../state/LaneState";

let correctValueForLaneNull = 0;
let waittimervar = false;

const allLaneData = [];
/*
= [
  {
    changed: 0,
    finishtime: "",
    islaptime: false,
    lane: "0",
    laptime: "",
    place: "",
    swimmerData: {
      clubid: "",
      clubname: "",
      name: "",
    },
  },
];
*/
/*
this.state = {
  WsConnected: false,
  HeatNumber: 0,
  EventNumber: 0,
  CompetitionName: 'new',
  DisplayMode: 'race'
}
*/
function WsConnect() {
  var context_path =
    process.env.REACT_APP_BACKEND_CONTEX_PATH === undefined
      ? "/ws2/socket.io"
      : "/" + process.env.REACT_APP_BACKEND_CONTEX_PATH + "/socket.io";
  var get_backend_port =
    process.env.REACT_APP_BACKEND_PORT === undefined
      ? "4001"
      : process.env.REACT_APP_BACKEND_PORT;
  var get_backend_url =
    process.env.REACT_APP_BACKEND_DIRECT === "true"
      ? window.location.protocol +
      "//" +
      window.location.hostname +
      ":" +
      window.location.port
      : process.env.REACT_APP_BACKEND_URL;
  var backend_url =
    get_backend_url === undefined
      ? window.location.protocol +
      "//" +
      window.location.hostname +
      ":" +
      get_backend_port
      : get_backend_url;

  var wait_on_stop =
    process.env.REACT_APP_WAIT_ON_STOP === undefined ? false : process.env.REACT_APP_WAIT_ON_STOP

  const [message, setMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const [lanes, setLanes] = useState([]);
  const [header, setHeader] = useState("");
  const [waitTimerDate, setWaitTimerDate] = useState(Date.now());


  //setCount(0);

  function setPrehandlerLanes(allLaneData) {
    if (wait_on_stop) {
      waitUntilEnd(waittimervar).then(() => {
        setLanes(allLaneData)
      })
    } else {
      setLanes(allLaneData)
    }
  }

  function setPrehandlerMessage(jsondata) {
    if (wait_on_stop) {
      var randomnumber = Math.floor(Math.random() * 100)
      var diff = Date.now() - waitTimerDate
      console.log("start ... " + randomnumber + " " + diff)
      waitUntilEnd(waittimervar).then(() => {
        setMessage(jsondata)
        var diff2 = Date.now() - waitTimerDate
        console.log(".... push " + randomnumber + " " + diff2)
      })
    } else {
      setLanes(jsondata)
    }
  }

  function setHPreHandlerHeader(jsondata) {
    if (wait_on_stop) {
      waitUntilEnd(waittimervar).then(() => {
        setHeader(jsondata)
      })
    } else {
      setHeader(jsondata)
    }
  }

  function delay(number) {
    return new Promise(resolve => setTimeout(resolve, number));
  }

  function waitUntilEnd(waittimer) {
    console.log(waittimer + " waitUntilEnd --" + waittimervar)
    if (waittimervar) {
      return new Promise(resolve => setTimeout(resolve, 20000));
    } else {
      return new Promise(resolve => setTimeout(resolve, 10));
    }
  }

  function setWaitEvent() {
    console.log("Wait Timer ------>")
    waittimervar = true
    setWaitTimerDate(Date.now())
    //delay
    delay(20000).then(() => {
      waittimervar = false
      console.log("<------ Wait Timer End ")
    })

  }

  useEffect(() => {
    //console.log('update allLaneData')
    setPrehandlerLanes(allLaneData);
    //console.log(lanes)
  }, [message]);

  useEffect(() => {
    console.log(backend_url + " Context " + context_path + " ->  REACT_APP_BACKEND_DIRECT " + process.env.REACT_APP_BACKEND_DIRECT);
    const newSocket = socketIOClient(backend_url, {
      path: context_path,
    });

    const messageListener = (newmessage) => {
      var jsondata = JSON.parse(newmessage);
      // lane data -> store in array
      // sonst kommt nur die letzte bahn in den hook -> zu schnell
      if (jsondata.type === "header") {
        setHPreHandlerHeader(jsondata)
      }

      if (jsondata.type === "stop") {
        setMessage(jsondata)
        if (wait_on_stop) {
          setWaitEvent()
        }
      }

      if (jsondata.type === "clear") {
        console.log('clear connect')
        setPrehandlerLanes([]);

        const d = new Date();
        var stopmessage = {
          type: 'stop',
          time: Math.round(d.getTime() / 1000).toString(),
          diff: '0'
        }
        //console.log(stopmessage)
        setMessage(stopmessage);
        return
      }

      if (jsondata.type === "lane") {
        //console.log(jsondata.lane)
        if (jsondata.lane !== undefined) {
          if (jsondata.lane === 0 && correctValueForLaneNull !== 1) {
            console.log("+++++ 0");
            correctValueForLaneNull = 1;
          }
          //var lengthLanes = lanes !== undefined ? lanes.length : 0;
          var sizeLanes = allLaneData.length - correctValueForLaneNull;
          if (jsondata.lane > sizeLanes) {
            allLaneData.push(jsondata);
          } else {
            allLaneData[jsondata.lane - 1 + correctValueForLaneNull] = jsondata;
          }
        }
      }

      setPrehandlerMessage(jsondata);
    };

    newSocket.on("FromAPI", messageListener);

    newSocket.on("connect", () => {
      setConnected(true);
      console.log("WsSocketState: connected " + backend_url + context_path);
    });

    newSocket.on("disconnect", () => {
      setConnected(false);
      console.log("WsSocketState: disconnected " + backend_url + context_path);
    });

    newSocket.io.on("error", (error) => {
      setConnected(false);
      console.log(
        "WsSocketState: error socket-io " + backend_url + context_path
      );
      console.log(error);
    });

    return () => {
      newSocket.close();
      setConnected(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WkAnalyseData message={message} connected={connected} lanes={lanes} header={header} />
  );
}

export default WsConnect;
