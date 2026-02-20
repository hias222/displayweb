import React from "react";

import { swimmerData } from "../types/SwimmerData";
import { LaneInterface } from "../interfaces/LaneInterface";
import { LaneState } from "../state/LaneState";

import checkUndefined from "../utilities/checkUndefined";
import StyledLane from "./lanes/StartStyledLane";
import FinishStyledLane from "./lanes/FinishStyledLane";

export class SingleLaneStaticComponent extends React.Component<LaneInterface, LaneState>{

  intervalId: NodeJS.Timeout;
  swimmer: swimmerData;

  constructor(props: LaneInterface) {
    super(props);

    this.swimmer = {
      name: "nn",
      clubid: "0",
      birthyear: "1900",
      clubname: "nn"
    }

    this.state = {
      lane: "",
      place: "",
      finishtime: "",
      laptime: "",
      islaptime: false,
      changed: Date.now(),
      swimmerData: this.swimmer
    }

    this.updateData = this.updateData.bind(this)
    this.getRaceData = this.getRaceData.bind(this)
    this.laptimer = this.laptimer.bind(this)
    this.intervalId = setInterval(this.laptimer, 1000);
  }

  componentDidMount() {
    this.updateData();

  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  componentDidUpdate(prevProps: LaneInterface) {
    //console.log("update " + this.props.lane.lane)
    if (prevProps.lane !== this.props.lane) {
      //console.log("diff update " + this.props.displayMode + " " + JSON.stringify(this.props.lane))
      this.updateData()
    }
  }

  laptimer() {
    if (this.state.islaptime) {
      var changesinceseconds = Date.now() - this.state.changed
      //console.log("lap " + this.state.lane + " changed since " + changesinceseconds)
      if (changesinceseconds > 15000) {
        //console.log("lap " + this.state.lane + " changed since " + changesinceseconds)
        this.setState({
          laptime: "",
          place: "",
          islaptime: false,
          finishtime: "",
        })
      }
    }
  }

  updateData() {
    //console.log(this.props.lane)
    console.log("update " + this.props.lane.lane)
    if (this.props.lane.swimmerData.name !== undefined) {
      this.setState(this.props.lane)
      /*
      this.setState({
        swimmerData: {
          birthyear: getBirthYear(this.props.lane.birthdate),
          name: this.props.lane.lastname,
          firstName: this.props.lane.firstname,
          clubid: this.props.lane.code,
          clubname: this.props.lane.name,
        },
        lane: this.props.lane.lane,
        changed: Date.now(),
      })
      */
    } else {
      //this.setState(this.props.lane)
      
      this.setState({
        swimmerData: {
          birthyear: " ",
          name: " ",
          firstName: " ",
          clubid: "-",
          clubname: ""
        },
        lane: this.props.lane.lane,
        islaptime: this.props.lane.islaptime,
        changed:this.props.lane.changed,
      })
      
    }
    /*

    if (this.props.lane.entrytime !== undefined) {
      this.setState({
        entrytime: this.props.lane.entrytime
      })
    }
    */

    if (this.props.lane.islaptime) {
      this.setState({
        laptime: checkUndefined(this.props.lane.finishtime),
      })
    } else {
      this.setState({
        place: checkUndefined(this.props.lane.place),
        finishtime: checkUndefined(this.props.lane.finishtime),
      })
    }

  }

  getData() {
    switch (this.props.displayMode) {
      case "startlist":
        return <StyledLane
          swimmer={this.state.swimmerData}
          lane={this.state.lane}
          entrytime={this.state.entrytime}
        />
      case "race":
        return this.getRaceData()
      default:
        return <p>no displaymode</p>
    }
  }
  //paste in state

  getRaceData() {
    //console.log(this.state.finishtime + " - " + this.state.laptime + ' is lap ' + this.state.islaptime)
    if (this.state.islaptime && (Date.now() - this.state.changed) < 15000) {
      //console.log("getRaceData lap " + this.state.lane + ' ' + this.state.laptime + ' ' + this.state.islaptime)
      return <FinishStyledLane
        swimmer={this.state.swimmerData}
        lane={this.state.lane}
        finishtime={this.state.laptime}
      />
    } else if (this.state.islaptime) {
      //console.log("getRaceData finish " + this.state.lane + ' ' + this.state.place + ' lap? ' + this.state.islaptime)
      return <FinishStyledLane
        swimmer={this.state.swimmerData}
        lane={this.state.lane}
        place=''
        finishtime=''
      />
    } else {
      //console.log("getRaceData finish " + this.state.lane + ' ' + this.state.place + ' lap? ' + this.state.islaptime)
      return <FinishStyledLane
        swimmer={this.state.swimmerData}
        lane={this.state.lane}
        place={this.state.place}
        finishtime={this.state.finishtime}
      />

    }
  }

  render() {
    return (
      this.getData()
    )
  }

}