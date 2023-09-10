

import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import WkAnalyseData from "./WkAnalyseData";
import React from "react";
//import "../styles/dynamic/App6.scss"

//import(utilsPath);
//import { LaneState } from "../state/LaneState";

let correctValueForLaneNull = 0;
let waittimervar = false;
let waitTimerDate = Date.now();
//let maxDelayTimeMS = 30000

const allLaneData = [];

function WsConnect() {

  let styleMode = process.env.REACT_APP_SHOW_MODE
  console.log("style " + styleMode)

  import("../styles/dynamic/App" + styleMode + ".scss");
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

  var maxDelayTimeMS =
    process.env.REACT_APP_WAIT_MS === undefined ? 25000 : process.env.REACT_APP_WAIT_MS

  const [message, setMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const [lanes, setLanes] = useState([]);
  const [header, setHeader] = useState("");

  function getMessageType(jsondata) {
    let msg_type = jsondata.type
    if (msg_type !== undefined) {
      return msg_type
    } else {
      return "unknown"
    }
  }

  function checkDelayMessage(jsondata) {

    if (wait_on_stop) {
      let msg_type = jsondata.type
      if (msg_type !== undefined) {
        if (msg_type === "lane" || msg_type === "header" || msg_type === "round" || msg_type === "start" || msg_type === "time" || msg_type === "best3") {
          var overall_wait = waittimervar ? true : false
          return overall_wait
        } else {
          return false
        }
      } else {
        return false
      }
    } else {
      return false
    }

  }

  function getWaitTime(msgType) {
    var diff = msgType === "header" ? Math.ceil(Date.now() - waitTimerDate) : Math.ceil((Date.now() - waitTimerDate) / 1.2)
    var delay_Time = maxDelayTimeMS - diff
    if (msgType === 'manual') {
      return 1000
    } else if (delay_Time < 100) {
      return 1
    } else if (delay_Time > maxDelayTimeMS) {
      return maxDelayTimeMS
    } else {
      return delay_Time
    }
  }

  function setPrehandlerLanes(allLaneData) {
    if (wait_on_stop) {
      waitUntilEnd("alllanes").then(() => {
        setLanes(allLaneData)
      })
    } else {
      setLanes(allLaneData)
    }
  }

  function setPrehandlerMessage(jsondata) {

    // sollen alle Nachrichten geschickt werden z.B best3 oder presentlane
    // todo mit parameter properties

    var msg_typ = getMessageType(jsondata)
    var checkbool = checkDelayMessage(jsondata)
    if (checkbool) {
      if (msg_typ !== 'time' && msg_typ !== 'best3') {
        waitUntilEnd(msg_typ).then(() => {
          setMessage(jsondata)
        })
      }
    } else {
      setMessage(jsondata)
    }
  }

  function setHPreHandlerHeader(jsondata) {
    var msg_typ = getMessageType(jsondata)
    if (checkDelayMessage(jsondata)) {
      waitUntilEnd(msg_typ).then(() => {
        setHeader(jsondata)
      })
    } else {
      setHeader(jsondata)
    }
  }

  function delay(number) {
    return new Promise(resolve => setTimeout(resolve, number));
  }

  function waitUntilEnd(msgType) {
    var waitime = getWaitTime(msgType)
    //console.log("wait? " + waittimervar + " waitime " + waitime + " " + msgType)
    return new Promise(resolve => setTimeout(resolve, waitime));
  }

  function setWaitEvent() {
    console.log("Wait Timer ------>")
    waittimervar = true
    waitTimerDate = Date.now()
    //delay
    delay(maxDelayTimeMS).then(() => {
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
        // müssen mal 0 schicken
        if (wait_on_stop) {
          var null_vallue = { type: 'time', value: '00:00,0' }
          console.log(null_vallue)
          setMessage(null_vallue)
          setWaitEvent()
          waitUntilEnd('manual').then(() => {
            setMessage(jsondata)
          })
        } else {
          setMessage(jsondata)
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
