import React from 'react';
import './styles/App.scss';
import { WsSocketState } from './services/WsSocketState';
import { FrontendState } from './state/FrontendState';

import classnames from 'classnames';
import { Box } from '@material-ui/core';
import { MessageFrontendComponent } from './components/messages/MessageFrontendComponent';
import { BaseFrontendStaticComponent } from './components/BaseFrontendStaticComponent';
import { eventHeat } from './types/EventHeat';
import { ResultFrontendComponent } from './components/result/ResultFrontendComponent';
import windowParameter from './utilities/windowParameter';

// https://towardsdatascience.com/passing-data-between-react-components-parent-children-siblings-a64f89e24ecf
// https://medium.com/@RupaniChirag/parent-child-communication-in-vue-angular-and-react-all-in-typescript-9a47c75cbf74
///type FrontendState = {
//  event: string;
//};


export default class Lcd extends React.Component<{}, FrontendState> {

    mylane: string[];
    correctValueForLaneNull: number;
    evenHeat: eventHeat;

    windowParams: windowParameter;


    window_width: number;
    window_height: number;
    //PIXEL_FROM_TOP
    window_top_pixel: number;


    constructor(props: {}) {
        super(props);

        this.windowParams = new windowParameter();
        
        this.onStartStop = this.onStartStop.bind(this);
        this.onEventHeatChange = this.onEventHeatChange.bind(this);
        this.onLaneChange = this.onLaneChange.bind(this);
        this.onDisplayModeChange = this.onDisplayModeChange.bind(this);
        this.onMessageChange = this.onMessageChange.bind(this);
        this.onResultChange = this.onResultChange.bind(this);
        this.onRunningTimeChange = this.onRunningTimeChange.bind(this);

        this.evenHeat = {
            name: "new",
            heatnr: "0",
            eventnr: "0"
        }

        this.state = {
            startdelayms: 0,
            runningTime: "",
            racerunning: false,
            eventHeat: this.evenHeat,
            lanes: [],
            displayMode: "race",
            MessageText: "",
            MessageTime: Date.now().toString(),
            VideoVersion: "",
            ResultJson: "",
            Fullscreen: false
        };
        this.mylane = [];
        this.correctValueForLaneNull = 0;
        this.window_width = this.windowParams.getWindowWidth()
        this.window_height = this.windowParams.getWindowHeight()
        this.window_top_pixel = this.windowParams.getWindowTopEmptyPixel();

    }
    async onStartStop(startdelayms: number) {
        console.log("App: start or stop event (" + startdelayms + ")");
        // start without stop
        if (startdelayms !== -1) {
            if (this.state.racerunning) {
                this.setState({
                    startdelayms: 0,
                    racerunning: false
                });
            }
        }
        this.setState({
            startdelayms: startdelayms,
            racerunning: true
        });
    }

    onEventHeatChange(EventHeat: eventHeat) {
        this.setState({
            eventHeat: EventHeat
        });
    }


    onRunningTimeChange(RunningTime: string) {
        this.setState({
            runningTime: RunningTime
        });
    }

    onLaneChange(lane: number, LaneData: any) {
        if (lane === -1) {
            console.log("+++++ clear all")
            this.correctValueForLaneNull = 0;
            this.setState({
                lanes: this.mylane = []
            })
        } else {

            // eslint-disable-next-line
            if (lane == 0 && this.correctValueForLaneNull != 1) {
                console.log("+++++ 0")
                this.correctValueForLaneNull = 1;
            }
            var sizeLanes = this.mylane.length - this.correctValueForLaneNull

            if (lane > sizeLanes) {
                console.log(lane + ": new (" + this.correctValueForLaneNull + ")")
                this.mylane.push(LaneData)
            } else {
                this.mylane[lane - 1 + this.correctValueForLaneNull] = (LaneData)
                console.log(lane + ": change (" + this.correctValueForLaneNull + ")")
            }

            this.setState({
                lanes: this.mylane
            })
        }
    }

    onDisplayModeChange(displaymode: string) {
        console.log("change to " + displaymode)
        this.setState({
            displayMode: displaymode
        })
    }

    onResultChange(result: any) {
        if (result !== undefined) {
            this.setState({
                ResultJson: result
            })
        }
    }

    onMessageChange(message: any) {

        if (message.version !== undefined) {
            this.setState({
                VideoVersion: message.version
            })
        }

        if (message.value !== undefined) {
            this.setState({
                MessageText: message.value
            })
        }

        if (message.time !== undefined) {
            this.setState({
                MessageTime: message.time
            })
        } else {
            this.setState({
                MessageTime: Date.now().toString()
            })
        }

    }

    handleFullscreen = (e: any) => {
        //Fullscreen
        this.setState({
            Fullscreen: true
        })
        const el = document.documentElement;
        if (el.requestFullscreen) {
            el.requestFullscreen();
        }
        /*
        else if (el.mozRequestFullScreen) {
            el.mozRequestFullScreen()
        } else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen()
        } else if (el.msRequestFullscreen) {
            el.msRequestFullscreen()
        }
        */
    };

    topbuttonfullscreen() {
        if (this.window_top_pixel > 0) {
            return <Box height={this.window_top_pixel}>
                <div>
                    <button onClick={this.handleFullscreen}>Full screen </button>
                </div>
            </Box>
        }
    }

    buttonfullscreen() {
        if (this.window_top_pixel === 0 && !this.state.Fullscreen) {
            return <div>
                <Box height={30}></Box>
                <Box height={50}>
                    <div>
                        <button onClick={this.handleFullscreen}>Full screen </button>
                    </div>
                </Box>
            </div>
        }
    }


    render() {

        let webcontent = <p>starting</p>;
        let statictable = classnames('statictable');

        if (this.state.displayMode === 'message' || this.state.displayMode === 'clock' || this.state.displayMode === 'video') {
            webcontent = <MessageFrontendComponent
                diplayMode={this.state.displayMode}
                MessageText={this.state.MessageText}
                MessageTime={this.state.MessageTime}
                VideoVersion={this.state.VideoVersion}
                displayFormat={"lcd"}
            />
        } else if (this.state.displayMode === 'result') {
            webcontent = <ResultFrontendComponent
                diplayMode={this.state.displayMode}
                ResultJson={this.state.ResultJson}
            />
        } else {
            webcontent = <BaseFrontendStaticComponent
                startdelayms={this.state.startdelayms}
                EventHeat={this.state.eventHeat}
                lanes={this.state.lanes}
                displayMode={this.state.displayMode}
                runningTime={this.state.runningTime}
            />
        }
        return (
            <div>
                {this.topbuttonfullscreen()}

                <Box width={this.window_width} height={this.window_height} className={statictable}>
                    <WsSocketState onStartStop={this.onStartStop}
                        onEventHeatChange={this.onEventHeatChange}
                        onLaneChange={this.onLaneChange}
                        onDisplayModeChange={this.onDisplayModeChange}
                        onRunningTimeChange={this.onRunningTimeChange}
                        onMessageChange={this.onMessageChange}
                        onResultChange={this.onResultChange}
                    />
                    {webcontent}

                </Box>

                {this.buttonfullscreen()}

            </div >
        );
    }
}
