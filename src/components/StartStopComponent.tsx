import classNames from "classnames";
import React from "react";
import { StartStopInterface } from "../interfaces/StartStopInterface";
import { StartStopState } from "../state/StartStopState";
import getMilliSecondsFromTimeString from "../utilities/getMilliSecondsFromTimeString";
import windowParameter from "../utilities/windowParameter";
import HeaderBoxName from "./svg/HeaderBoxName";
import HeaderTimeLine from "./svg/HeaderTime";
import HeaderBoxNameLarge from "./svg/HeaderBoxNameLarge";


export class StartStopComponent extends React.Component<StartStopInterface, StartStopState> {

    clocktimerid?: NodeJS.Timeout;
    windowParams: windowParameter;

    constructor(props: StartStopInterface) {
        super(props);
        this.windowParams = new windowParameter();

        this.state = {
            displaytime: 0,
            start: Date.now() - props.startdelayms,
            isOn: false,
            runningTime: ""
        }

        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.clocktimer = this.clocktimer.bind(this)
    }

    format(ms: number) {
        var minutes = Math.floor(ms / (1000 * 60)),
            seconds = Math.floor((ms - minutes * 1000 * 60) / 1000),
            fract = Math.floor((ms - minutes * 1000 * 60 - seconds * 1000) / 100);

        return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds + ',' + fract;
    }

    startTimer() {
        this.setState({
            isOn: true,
            start: Date.now() - this.props.startdelayms
        })

        if (this.clocktimerid) {
            var clocktimeridold = this.clocktimerid
            clearInterval(clocktimeridold)
        }
        this.clocktimerid = setInterval(this.clocktimer, 100);
    }

    correctTimer(newTime: string) {

        if (getMilliSecondsFromTimeString(newTime) > 2000 && !this.state.isOn) {
            console.log('missed start')
            this.startTimer()
        } else {
            var timeReceived = getMilliSecondsFromTimeString(newTime)
            if (timeReceived > 1000) {
                var diff = Math.abs(timeReceived - this.state.displaytime);
                if (diff > 1000) {
                    console.log('Correct Time, diff lt 1s')
                    this.setState({
                        displaytime: timeReceived,
                        start: Date.now() - timeReceived,
                    })
                }
            }
        }
    }

    async stopTimer() {

        this.setState({
            isOn: false,
            displaytime: 0,
            start: Date.now() - this.props.startdelayms,
        })

        if (this.clocktimerid !== undefined) {
            clearInterval(this.clocktimerid);
        }

        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve("done!"), 250)
        });

        let result = await promise; // wait till the promise resolves (*)
        console.log(result)

    }

    clocktimer() {
        if (!this.state.isOn) {
            if (this.clocktimerid !== undefined) {
                clearInterval(this.clocktimerid);
            }
        }

        this.setState({
            displaytime: Date.now() - this.state.start
        })
    }

    componentDidUpdate(prevProps: StartStopInterface) {

        if ((getMilliSecondsFromTimeString(this.props.runningTime) === 0)) {
            var diff = Date.now() - this.state.start
            if (this.state.isOn && diff > 5000) {
                console.log('reset timer ' + this.state.displaytime + ' ' + this.props.runningTime)
                this.stopTimer()
                /*
                this.setState({
                    isOn: false,
                    displaytime: 0,
                    start: Date.now() - this.props.startdelayms,
                })
                */
            }
        }

        if (prevProps.startdelayms !== this.props.startdelayms) {

            if (this.props.startdelayms === -1) {
                console.log("StartStopComponent: new Data stop");
                this.stopTimer()
            } else {
                console.log("StartStopComponent: new Data start");
                this.startTimer()
            }
        }

        if (prevProps.runningTime !== this.props.runningTime) {
            this.correctTimer(this.props.runningTime);
            //this.setState({
            //    runningTime: this.props.runningTime
            //})
        }
    }

    componentWillUnmount() {
        if (this.clocktimerid !== undefined) {
            clearInterval(this.clocktimerid);
        }
    }


    getShow() {

        let noSpaceContainerHorizontal = classNames("noSpaceContainerHorizontal");
        let noSpaceContainerVertical = classNames("noSpaceContainerVertical")

        if (this.windowParams.getDetailsInHeader()) {
            return (
            <div className={noSpaceContainerHorizontal} >
                        <HeaderBoxName HeaderName={"Wk: " + this.props.EventHeat.eventnr + "  L: " + this.props.EventHeat.heatnr} IsFirstText={true} Parts={2}></HeaderBoxName>
                        <HeaderTimeLine
                            Time={this.format(this.state.displaytime)}
                            IsFirstText={false}
                            Round={this.props.round}
                            Distance={this.props.EventHeat.distance != null ? this.props.EventHeat.distance : "99"}
                            Parts={2} />
                    </div>
            )
        } else if (this.windowParams.getDetailsInHeader()) {

                return (

                    <div className={noSpaceContainerHorizontal} >
                        <HeaderBoxName HeaderName={"Wk: " + this.props.EventHeat.eventnr} IsFirstText={true} Parts={3}></HeaderBoxName>
                        <HeaderBoxName HeaderName={"Lauf: " + this.props.EventHeat.heatnr} IsFirstText={false} Parts={3}></HeaderBoxName>
                        <HeaderTimeLine
                            Time={this.format(this.state.displaytime)}
                            IsFirstText={false}
                            Round={this.props.round}
                            Distance={this.props.EventHeat.distance != null ? this.props.EventHeat.distance : "99"}
                            Parts={3} />
                    </div>
                )
            } else if (this.windowParams.getSeparateSmallWindow()) {
                return (
                    <div className={noSpaceContainerVertical}>
                        <HeaderBoxName HeaderName={"Wettkampf"} IsFirstText={true} Parts={1}></HeaderBoxName>
                        <HeaderBoxNameLarge HeaderName={this.props.EventHeat.eventnr} IsFirstText={true} Parts={1}></HeaderBoxNameLarge>
                        <HeaderBoxName HeaderName={"Lauf"} IsFirstText={true} Parts={1}></HeaderBoxName>
                        <HeaderBoxNameLarge HeaderName={this.props.EventHeat.heatnr} IsFirstText={true} Parts={1}></HeaderBoxNameLarge>
                        <div className={noSpaceContainerHorizontal} >
                            <HeaderTimeLine
                                Time={this.format(this.state.displaytime)}
                                IsFirstText={true}
                                Round={this.props.round}
                                Distance={this.props.EventHeat.distance != null ? this.props.EventHeat.distance : "99"}
                                Parts={1} />
                        </div>
                    </div>)
            }
            else if (this.windowParams.getOnlyLaneAndPlace()) {
                return (
                    <div className={noSpaceContainerVertical}>
                        <div className={noSpaceContainerHorizontal} >
                            <HeaderBoxName HeaderName={"W " + this.props.EventHeat.eventnr} IsFirstText={true} Parts={2}></HeaderBoxName>
                            <HeaderBoxName HeaderName={"L " + this.props.EventHeat.heatnr} IsFirstText={false} Parts={2}></HeaderBoxName>
                        </div>
                        <div className={noSpaceContainerHorizontal} >
                            <HeaderTimeLine
                                Time={this.format(this.state.displaytime)}
                                IsFirstText={true}
                                Round={this.props.round}
                                Distance={this.props.EventHeat.distance != null ? this.props.EventHeat.distance : "99"}
                                Parts={1} />
                        </div>
                    </div>)
            } else {
                return (
                    <div className={noSpaceContainerHorizontal} >
                        <HeaderBoxName HeaderName={"Wk: " + this.props.EventHeat.eventnr} IsFirstText={false} Parts={3}></HeaderBoxName>
                        <HeaderBoxName HeaderName={"L: " + this.props.EventHeat.heatnr} IsFirstText={false} Parts={3}></HeaderBoxName>
                        <HeaderTimeLine
                            Time={this.format(this.state.displaytime)}
                            IsFirstText={false}
                            Round={this.props.round}
                            Distance={this.props.EventHeat.distance != null ? this.props.EventHeat.distance : "99"}
                            Parts={3} />
                    </div>
                )
            }


    }

    render() {
        return this.getShow()
    }
}