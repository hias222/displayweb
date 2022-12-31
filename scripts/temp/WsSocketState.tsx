import React from "react";
import { WsSocketPropsInterface } from "../../interfaces/WsSocketPropsInterface";

import socketIOClient from "socket.io-client";
import { WsSocketPropsState } from "../../state/WsSocketPropsState";

import getSwimStyles from '../../utilities/getSwimStyles';

export class WsSocketState extends React.Component<WsSocketPropsInterface, WsSocketPropsState>
{
  backend_url: string;
  context_path: string;
  local_url: string;
  clearstartlistonstart: string;
  frozendisplay: boolean;

  constructor(props: WsSocketPropsInterface) {
    super(props);
    this.context_path = process.env.REACT_APP_BACKEND_CONTEX_PATH === undefined ? "/socket.io" : "/" + process.env.REACT_APP_BACKEND_CONTEX_PATH + "/socket.io"
    this.local_url = process.env.REACT_APP_BACKEND_URL === undefined ? window.location.protocol + "//localhost:" + window.location.port : process.env.REACT_APP_BACKEND_URL
    this.backend_url = process.env.REACT_APP_BACKEND_DIRECT !== "false" ? window.location.protocol + "//" + window.location.hostname + ":" + window.location.port : this.local_url
    this.clearstartlistonstart = process.env.REACT_APP_CLEAR_START_LIST_ON_START === undefined ? "true" : process.env.REACT_APP_CLEAR_START_LIST_ON_START
    this.frozendisplay = false;

    this.state = {
      WsConnected: false,
      HeatNumber: 0,
      EventNumber: 0,
      CompetitionName: 'new',
      DisplayMode: 'race'
    }
  }

  componentDidMount() {

    console.log("WsSocketState: connect to " + this.backend_url + "/" + this.context_path);

    const socket = socketIOClient(this.backend_url,
      {
        path: this.context_path
      });

    socket.on('connect', () => {
      this.setState({
        WsConnected: true
      })
    });

    socket.on('disconnect', () => {
      console.log("WsSocketState: disconnected " + this.backend_url + " socket-io");
      this.setState({
        WsConnected: false
      })
    });

    socket.on("FromAPI", (data: any) => {
      var jsondata = JSON.parse(data)
      this.checkIncoming(jsondata);
      //    this.setState({ response: true })
      //console.log("WsSocketState FromAPI type: " + jsondata.type)
    });
  }


  checkIncoming(jsondata: any) {
    var messageType = jsondata.type
    //finishtime: "undefined"
    switch (messageType) {
      case "start": {
        this.setStartMode(jsondata.diff)
        if (this.clearstartlistonstart === 'false') {
          // wait and than set
          setTimeout(() => {
            this.frozendisplay = false
            console.log('auto frozen')
          }, 5000);

        }
        break;
      }
      case "stop": {
        this.props.onStartStop(-1)
        if (this.clearstartlistonstart === 'false') {
          this.frozendisplay = true;
        }
        break;
      }
      case "header": {
        this.setHeaderInfo(jsondata);
        this.frozendisplay = false;
        break;
      }
      case "lane": {
        this.setLaneInfo(jsondata)
        break;
      }
      case "clear": {
        //state.lanes = []
        this.clearAll()
        this.setDisplayMode("clear")
        break;
      }
      case "startlist": {
        // ???
        this.setDisplayMode("startlist")
        break;
      }
      case "race": {
        // ???
        this.setDisplayMode("race")
        break;
      }
      case "clock": {
        // ???
        this.setDisplayMode("clock")
        break;
      }
      case "result": {
        // ???
        this.setDisplayMode("result")
        this.props.onResultChange(jsondata)
        break;
      }
      case "time": {
        this.setRunningTime(jsondata)
        break;
      }
      case "message": {
        this.setDisplayMode("message")
        this.props.onMessageChange(jsondata)
        break;
      }
      case "lenex": {
        this.setDisplayMode("message")
        this.props.onMessageChange(jsondata)
        break;
      }
      case "video": {
        // ???
        this.setDisplayMode("video")
        this.props.onMessageChange(jsondata)
        break;
      }

    }
  }

  setHeaderInfo(jsondata: any) {

    if (jsondata.heat !== this.state.HeatNumber || jsondata.event !== this.state.EventNumber) {

      this.setDisplayMode('startlist')

      var swimstyle = (typeof (jsondata.name) !== "undefined" && jsondata.name)
        ? jsondata.name : jsondata.distance + "m " + getSwimStyles(jsondata.swimstyle)
      //var eventtxt = "Wettkampf " + jsondata.event + ": " + swimstyle
      //var heattxt = "Lauf " + jsondata.heat + ":"

      this.props.onEventHeatChange({
        name: swimstyle,
        eventnr: jsondata.event,
        heatnr: jsondata.heat,
        competition: jsondata.competition,
        distance: jsondata.distance,
        gender: jsondata.gender,
        relaycount: jsondata.relaycount,
        round: jsondata.round,
        swimstyle: jsondata.swimstyle
      })

      this.setState({
        EventNumber: jsondata.event,
        HeatNumber: jsondata.heat,
        CompetitionName: jsondata.competition
      })
    } else {
      console.log("header no event or heat change ")
    }
    //setTimeout(this.activatePage, 500);
  }

  setLaneInfo(jsondata: any) {

    //this.clearstartlistonstart === 'false' && 

    if (this.frozendisplay) {
      console.log('ignore time ' + jsondata.finishtime)
    } else {
      //locklanes = true;
      if (jsondata.place === '0') {
        var laptime = "{ \"laptime\": \"" + Date.now() + "\",\"lap\": \"true\" }"
        var newjsondata = { ...jsondata, ...JSON.parse(laptime) }
        //activelapdata = true;
        this.props.onLaneChange(jsondata.lane, newjsondata)
        if (this.state.DisplayMode !== 'race') {
          this.setDisplayMode('race')
        }
      } else {
        var laptime2 = "{ \"lap\": \"false\" }"
        var newjsondata2 = { ...jsondata, ...JSON.parse(laptime2) }
        this.props.onLaneChange(jsondata.lane, newjsondata2)

        if (jsondata.finishtime === "undefined" || !jsondata.finishtime) {
          if (this.state.DisplayMode !== 'startlist' && this.state.DisplayMode !== 'race') {
            this.setDisplayMode('startlist')
          }
        } else {
          if (this.state.DisplayMode !== 'race') {
            this.setDisplayMode('race')
          }
        }
      }
    }
  }

  setRunningTime(time: any) {
    if (time.value === "undefined" || !time.value) {
      this.props.onRunningTimeChange("0");
    } else {
      this.props.onRunningTimeChange(time.value);
    }

  }


  setDisplayMode(mode: string) {
    this.setState({
      DisplayMode: mode
    })
    this.props.onDisplayModeChange(mode)
  }

  setStartMode(startdelay: number) {
    var calcstartdelay = typeof (startdelay) != 'undefined' ? startdelay : 100

    if (this.clearstartlistonstart === 'true') {
      this.setDisplayMode('startlist')
    }

    this.props.onStartStop(calcstartdelay)
  }

  clearAll() {
    this.props.onLaneChange(-1, null)
  }

  render() {

    var webcontent = "";

    if (!this.state.WsConnected) {
      webcontent = "connection Error";
    }

    return (
      <div>
        {webcontent}
      </div>
    );
  }
}
