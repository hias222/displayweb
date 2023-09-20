import React from "react";
import { HiitState } from "../../state/HiitState";
import HiitLine from "./HiitLine";
import classNames from "classnames";
import { swimmerPosition } from "../../types/SwimmerPosition";
import HiitHeader from "./HiitHeader";

export type HiitType = {
    ticker: number;
    departure: number;
    varianz: number;
    round: number;
    gap: number;
    position: swimmerPosition;
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
            position: {
                order: 1,
                intensity: 20
            },
            gap: 5,
            departure: 30,
            ticker: 0,
            varianz: 1,
            round: 0
        }
    }

    componentDidUpdate(prevProps: HiitInterface) {

        if (prevProps !== this.props) {
            

            if (this.props.HiitState.event === 'config') {
                console.log('config')
                console.log(this.props.HiitState)
                this.setState({ position: { intensity: Number.parseFloat(this.props.HiitState.intensity), order: 1 } })
                this.setState({ departure: Number.parseFloat(this.props.HiitState.departure) })
                this.setState({ varianz: Number.parseFloat(this.props.HiitState.varianz) })
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

        var roundTicker = ticker - (this.state.round * this.state.departure )

        if (roundTicker >= (this.state.departure)) {
            this.setState({ "round": this.state.round + 1 })
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
        var roundTicker = this.state.ticker - (this.state.round * (this.state.departure + this.state.position.intensity))
        var countdown = (this.state.departure + this.state.position.intensity) - roundTicker
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
                <HiitHeader ticker={this.state.ticker} round={this.state.round}></HiitHeader>
                <HiitLine ticker={this.state.ticker} departure={this.state.departure} gap={this.state.gap} varianz={this.state.varianz}
                    swimmerPos={this.state.position}></HiitLine>
            </div>
        )
    }
}
