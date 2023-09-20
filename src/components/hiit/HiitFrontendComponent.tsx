import React from "react";
import { HiitState } from "../../state/HiitState";
import HiitLine from "./HiitLine";
import classNames from "classnames";

export type HiitType = {
    slow: number;
    shigh: number;
    ticker: number;
    intense: number;
    varianz: number;
    round: number;
}

export interface HiitInterface {
    HiitState: HiitState;
}

export class HiitFrontendComponent extends React.Component<HiitInterface, HiitType> {

    clocktimerid?: NodeJS.Timeout;
    timerseconds: number;

    constructor(props: HiitInterface) {
        super(props)

        this.clocktimer = this.clocktimer.bind(this)
        this.timerseconds = 0;

        this.state = {
            slow: 10,
            shigh: 30,
            ticker: 0,
            intense: 0,
            varianz: 1,
            round: 0
        }
    }

    componentDidUpdate(prevProps: HiitInterface) {

        if (prevProps !== this.props) {

            if (this.props.HiitState.event === 'config') {
                console.log('config')
                this.setState({ slow: Number.parseFloat(this.props.HiitState.slow) })
                this.setState({ shigh: Number.parseFloat(this.props.HiitState.shigh) })
            }

            if (this.props.HiitState.event === 'start') {
                console.log('start')
                this.startTimer()
            }

            if (this.props.HiitState.event === 'stop') {
                console.log('stop')
                this.stopTimer()
            }
        }
    }

    componentWillUnmount() {
        if (this.clocktimerid !== undefined) {
            clearInterval(this.clocktimerid);
        }
    }

    clocktimer() {
        console.log('tick ' + this.timerseconds)
        this.timerseconds = this.timerseconds + 1
        this.setState({ "ticker": this.timerseconds })
        this.checkState(this.timerseconds)
        //if (this.clocktimerid !== undefined) {
        //    clearInterval(this.clocktimerid);
        //}
    }

    checkState(ticker: number) {

        var roundTicker = ticker - (this.state.round * (this.state.shigh + this.state.slow))

        if (roundTicker >= this.state.shigh - this.state.varianz - 1) {
            this.setState({ "intense": 1 })
        }

        if (roundTicker > this.state.shigh + this.state.varianz - 1) {
            this.setState({ "intense": 2 })
        }

        if (roundTicker >= (this.state.shigh + this.state.slow - 5)) {
            this.setState({ "intense": 3 })
        }

        if (roundTicker >= (this.state.shigh + this.state.slow)) {
            this.setState({ "round": this.state.round + 1 })
            this.setState({ "intense": 0 })
        }

        if (roundTicker < this.state.shigh - 1) {
            this.setState({ "intense": 0 })
        }

    }

    startTimer() {
        if (this.timerseconds === 0) {

            if (this.clocktimerid) {
                var clocktimeridold = this.clocktimerid
                clearInterval(clocktimeridold)
            }
            this.clocktimerid = setInterval(this.clocktimer, 1000);
        }
    }

    async stopTimer() {

        if (this.clocktimerid !== undefined) {
            clearInterval(this.clocktimerid);
        }

        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve("done!"), 250)
        });

        let result = await promise; // wait till the promise resolves (*)
        this.timerseconds = 0;
        this.setState({ "round": 0 })
        console.log(result)
    }

    render() {
        var roundTicker = this.state.ticker - (this.state.round * (this.state.shigh + this.state.slow))
        var countdown = (this.state.shigh + this.state.slow) - roundTicker
        var abgang = countdown > 5 ? "" : countdown

        /*
                            Mode HIIT
                            <br></br>
                            {this.state.shigh} - {this.state.slow}
                            <br></br>
                            {roundTicker}: {this.state.intense} - {abgang}
                            <br></br>
                            {this.state.ticker} - {this.state.round + 1}
                            */

        let noSpaceContainerVertical = classNames("noSpaceContainerVertical")

        return (
            <div key={200} className={noSpaceContainerVertical}>
                <HiitLine message={this.state.ticker + ":"}></HiitLine>
                <HiitLine message={roundTicker + " : " + this.state.intense + " " + abgang}></HiitLine>
            </div>
        )
    }
}
