import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import WkAnalyseData from "./WkAnalyseData";
import React from "react";
import "../styles/App.scss";
//import { LaneState } from "../state/LaneState";

let correctValueForLaneNull = 0;

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

  const [message, setMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const [lanes, setLanes] = useState([]);
  const [header, setHeader] = useState("");
  //setCount(0);

  useEffect(() => {
    //console.log('update allLaneData')
    setLanes(allLaneData);
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
        setHeader(jsondata)
      }

      if (jsondata.type === "clear") {
        console.log('clear connect')
        setLanes([]);

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
      setMessage(jsondata);
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
