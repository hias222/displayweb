import React from "react";
import { MessageInterface } from "../../interfaces/MessageInterface";
// import { VideoFrontendComponent } from "./VideoFrontendComponent";
import BoardClock from "../clock/BoardClock";
import { MessageBoxComponent } from "./MessageBoxComponent";
import { ObsFrontendComponent } from "./ObsFrontendComponent";

export type MessageType = {
    displayMode: string;
    Message: string;
}

export class MessageFrontendComponent extends React.Component<MessageInterface, MessageType> {

    constructor(props: MessageInterface) {
        super(props)
        this.state = {
            displayMode: this.props.diplayMode,
            Message: this.props.MessageText
        }
    }

    setFrontend(displayMode: string) {
        this.setState({
            displayMode: displayMode
        })
    }

    getVideoUrl() {
        console.log("init vodeo nr " + this.props.VideoVersion)

        let backend_url = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port
   

        if (this.props.VideoVersion === "1") {
            console.log(backend_url + "/data/video1.mp4")
            return backend_url + "/data/video1.mp4"
        }
        if (this.props.VideoVersion === "2") {
            console.log(backend_url + "/data/video2.mp4")
            return backend_url + "/data/video2.mp4"
        }
        if (this.props.VideoVersion === "3") {
            return backend_url + "/data/video3.mp4"
        }

        if (this.props.VideoVersion === "4") {
            return backend_url + "/data/video4.mp4"
        }

        if (this.props.VideoVersion === "5") {
            //return "https://s3.amazonaws.com/_bc_dml/example-content/sintel_dash/sintel_vod.mpd"
            return "https://swim.fritz.box/dash/obs_stream.mpd"
        }
        console.log("not found video " + this.props.VideoVersion)
        return ""
    }

    // http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4
    // http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
    getFrontend() {
        switch (this.state.displayMode) {
            case "video":
                switch (this.props.displayFormat) {
                    case "fixed":
                        return <ObsFrontendComponent
                            videoURL={this.getVideoUrl()}
                            height="382"
                            width="510"
                        />
                    default:
                        return <ObsFrontendComponent
                            videoURL={this.getVideoUrl()}
                            height="100%"
                            width="100%"
                        />
                }
            case "message":
                return <MessageBoxComponent
                    MessageText={this.props.MessageText}
                    MessageTime={this.props.MessageTime} />
            case "clock":
                return <BoardClock
                    type="123"
                    unixcompetitiontime={this.props.MessageTime}
                />
            default:
                return <h1>not defined - this.state.displayMode</h1>
        }
    }

    componentDidUpdate(prevProps: MessageInterface) {
        if (prevProps.diplayMode !== this.props.diplayMode) {
            console.log("update diplayMode " + this.props.diplayMode)
            this.setFrontend(this.props.diplayMode)
            return
        }
    }

    render() {
        return this.getFrontend()
    }
}
