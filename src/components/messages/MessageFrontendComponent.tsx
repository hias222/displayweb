import React from "react";
import { MessageInterface } from "../../interfaces/MessageInterface";
import { VideoFrontendComponent } from "./VideoFrontendComponent";
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

    getVideoType() {
        if (this.props.VideoVersion === "5" || this.props.VideoVersion === "4") {
            return <ObsFrontendComponent
                videoURL={this.getVideoUrl()}
                height="100%"
                width="100%"
            />
        } else {
            return <VideoFrontendComponent
                videoURL={this.getVideoUrl()}
                height="100%"
                width="100%"
            />
        }
    }

    getVideoUrl() {
        console.log("init vodeo filename " + this.props.VideoVersion)
        let backend_url = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port

        if (this.props.VideoVersion === "4") {
            //return backend_url + "/data/video4.mp4"
            console.log("/hls/obs_stream.m3u8")
            return backend_url + "/hls/obs_stream.m3u8"
            
        } else if (this.props.VideoVersion === "5") {
            //return "https://s3.amazonaws.com/_bc_dml/example-content/sintel_dash/sintel_vod.mpd"
            //return "https://swim.fritz.box/dash/obs_stream.mpd"
            console.log("/dash/obs_stream.mpd")
            return backend_url + "/dash/obs_stream.mpd"
        } else if (this.props.VideoVersion !== undefined && this.props.VideoVersion !== "") {
            var video_url = backend_url + "/data/" + this.props.VideoVersion
            console.log(video_url)
            return video_url
        } else {
            console.log(backend_url + "/data/video1.mp4")
            return backend_url + "/data/video1.mp4"
        }

    }

    // http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4
    // http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
    getFrontend() {
        switch (this.state.displayMode) {
            case "video":
                switch (this.props.displayFormat) {
                    case "fixed":
                        return <VideoFrontendComponent
                            videoURL={this.getVideoUrl()}
                            height="382"
                            width="510"
                        />
                    default:
                        return this.getVideoType()
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
