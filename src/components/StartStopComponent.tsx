import classNames from "classnames";
import React from "react";
import { StartStopInterface } from "../interfaces/StartStopInterface";
import { StartStopState } from "../state/StartStopState";
import windowParameter from "../utilities/windowParameter";
import HeaderBoxName from "./svg/HeaderBoxName";
import HeaderTimeLine from "./svg/HeaderTime";


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
        console.log(newTime + " " + this.format(this.state.displaytime))
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
            this.setState({
                runningTime: this.props.runningTime
            })
        }
    }

    componentWillUnmount() {
        if (this.clocktimerid !== undefined) {
            clearInterval(this.clocktimerid);
        }
    }

    getShow() {

        let noSpaceContainerHorizontal = classNames("noSpaceContainerHorizontal");

        if (this.windowParams.getDetailsInHeader()) {

        return (
            <div className={noSpaceContainerHorizontal} >
                <HeaderBoxName HeaderName={"Wettkampf: " + this.props.EventHeat.eventnr} IsFirstText={true} Parts={3}></HeaderBoxName>
                <HeaderBoxName HeaderName={"Lauf: " + this.props.EventHeat.heatnr} IsFirstText={false} Parts={3}></HeaderBoxName>
                <HeaderTimeLine
                    Time={this.format(this.state.displaytime)}
                    IsFirstText={false}
                    Parts={3} />
            </div>
        )
        }else {
            return (
                <div className={noSpaceContainerHorizontal} >
                    <HeaderBoxName HeaderName={"Wk: " + this.props.EventHeat.eventnr} IsFirstText={false} Parts={3}></HeaderBoxName>
                    <HeaderBoxName HeaderName={"L: " + this.props.EventHeat.heatnr} IsFirstText={false} Parts={3}></HeaderBoxName>
                    <HeaderTimeLine
                        Time={this.format(this.state.displaytime)}
                        IsFirstText={false}
                        Parts={3} />
                </div>
            )
        }


    }


    render() {
        return this.getShow()
    }
}