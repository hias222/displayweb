import React from "react";
import { HiitState } from "../../state/HiitState";
import HiitLine from "./HiitLine";
import classNames from "classnames";
import { swimmerPosition } from "../../types/SwimmerPosition";
import HiitHeader from "./HiitHeader";
import HiitConfigLine from "./HiitConfigLine";
import windowParameter from "../../utilities/windowParameter";
import HiitGridLine from "./HiitGridLine";
import HiitGridConfig from "./HiitGridConfig";

export type HiitType = {
    mode: string;
    ticker: number;
    departure: number;
    varianz: number;
    round: number;
    gap: number;
    position: swimmerPosition[];
}

export interface HiitInterface {
    HiitState: HiitState;
}

export class HiitFrontendComponent extends React.Component<HiitInterface, HiitType> {

    clocktimerid?: NodeJS.Timeout;
    timerseconds: number;
    winPrameters: windowParameter;

    constructor(props: HiitInterface) {
        super(props)

        this.clocktimer = this.clocktimer.bind(this)
        this.timerseconds = 0;
        this.winPrameters = new windowParameter()

        this.state = {
            mode: 'config',
            position: [{
                order: 1,
                intensity: '35',
                id: '1'
            }],
            gap: 5,
            departure: 55,
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
                this.setState({
                    mode: this.props.HiitState.mode,
                    gap: Number.parseFloat(this.props.HiitState.gap),
                    departure: Number.parseFloat(this.props.HiitState.departure),
                    varianz: Number.parseFloat(this.props.HiitState.varianz),
                    position: this.props.HiitState.rows
                })

            }

            if (this.props.HiitState.event === 'start') {
                console.log('start')
                this.setState({ mode: 'data' })
                this.startTimer()
            }

            if (this.props.HiitState.event === 'stop') {
                console.log('stop')
                this.setState({ mode: 'data' })
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
        var roundTicker = ticker - (this.state.round * this.state.departure)
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

    getDisplayMode() {
        if (this.winPrameters.getRenderMode() === 'grid') {
            return this.getDisplayGrid()
        } else {
            return this.getDisplayDate()
        }
    }

    getDisplayGrid() {
        if (this.state.mode === 'config') {
            return <HiitGridConfig key={1} round={(this.state.round + 1).toString()} ticker={this.state.ticker} departure={this.state.departure} gap={this.state.gap} varianz={this.state.varianz}
                swimmerPos={this.state.position}></HiitGridConfig>
        } else {
            return <HiitGridLine key={1} round={(this.state.round + 1).toString()} ticker={this.state.ticker} departure={this.state.departure} gap={this.state.gap} varianz={this.state.varianz}
                swimmerPos={this.state.position}></HiitGridLine>
        }

    }

    getDisplayDate() {
        let noSpaceContainerVertical = classNames("noSpaceContainerVertical")
        if (this.state.mode === 'config') {
            return <div >
                <HiitHeader departure={'Zeit'} ticker={'Gap'} round={'Var'}></HiitHeader>
                <HiitHeader departure={this.state.departure.toString()} ticker={this.state.gap.toString()} round={this.state.varianz.toString()}></HiitHeader>
                {this.state.position.filter(row => Number.parseFloat(row.intensity) > 0).map((row, index) => (
                    <HiitConfigLine key={index} ticker={this.state.ticker} departure={this.state.departure} gap={this.state.gap} varianz={this.state.varianz}
                        swimmerPos={row}></HiitConfigLine>
                ))}
            </div>

        }

        if (this.state.mode === 'data') {

            return <div key={200} className={noSpaceContainerVertical}>
                <HiitHeader departure={this.state.departure.toString()} ticker={this.state.ticker.toString()} round={(this.state.round + 1).toString()}></HiitHeader>
                {this.state.position.filter(row => Number.parseFloat(row.intensity) > 0).map((row, index) => (
                    <HiitLine key={index} ticker={this.state.ticker} departure={this.state.departure} gap={this.state.gap} varianz={this.state.varianz}
                        swimmerPos={row}></HiitLine>
                ))}
            </div>

        }
    }

    render() {
        return (
            this.getDisplayMode()
        )
    }
}
