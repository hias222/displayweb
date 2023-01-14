import React from "react";
import { MessageInterface } from "../../interfaces/MessageInterface";
import { VideoFrontendComponent } from "./VideoFrontendComponent";
import BoardClock from "../clock/BoardClock";
import { MessageBoxComponent } from "./MessageBoxComponent";
import { ObsFrontendComponent } from "./ObsFrontendComponent";
import TopEventNameHeader from "../svg/TopEventNameHeader";
import { ImageFrontendComponent } from "./ImageFrontendComponent";

export type MessageType = {
    displayMode: string;
    Message: string;
}

export class MessageFrontendComponent extends React.Component<MessageInterface, MessageType> {

    web_data_url: string;
    constructor(props: MessageInterface) {
        super(props)
        this.state = {
            displayMode: this.props.diplayMode,
            Message: this.props.MessageText
        }

        this.web_data_url =
            process.env.REACT_APP_WEB_DATA_URL === undefined
                ? window.location.protocol +
                "//" +
                window.location.hostname +
                ":" +
                window.location.port
                : process.env.REACT_APP_WEB_DATA_URL;
    }

    setFrontend(displayMode: string) {
        this.setState({
            displayMode: displayMode
        })
    }

    getVideoType() {
        var videoformat = this.getVideoFormat()
        if (this.props.VideoVersion === "5" || this.props.VideoVersion === "4") {
            return <ObsFrontendComponent
                videoURL={this.getVideoUrl()}
                height="100%"
                width="100%"
            />
        } else {
            switch (videoformat) {
                case "video":
                    return <VideoFrontendComponent
                        videoURL={this.getVideoUrl()}
                        height="100%"
                        width="100%"
                        type={videoformat}
                    />
                case "image":
                    return <ImageFrontendComponent
                        videoURL={this.getVideoUrl()}
                        height="100%"
                        width="100%"
                        type={videoformat}
                    />
                default:
                    return <div>
                        <TopEventNameHeader EventName={"not sopprted  " + videoformat} />
                        <TopEventNameHeader EventName={this.getVideoUrl()} />
                    </div>
            }
        }
    }

    getVideoFormat(): string {
        var extension = this.props.VideoVersion.substring(this.props.VideoVersion.lastIndexOf('.') + 1, this.props.VideoVersion.length) || this.props.VideoVersion;

        switch (extension.toLowerCase()) {
            case "mp4":
                return "video"
            case "ogg":
                return "video"
            case "webm":
                return "video"
            case "jpg":
                return "image"
            case "gif":
                return "image"
            case "png":
                return "image"
            default:
                return "unknown"
        }
    }

    getVideoUrl() {
        console.log("video filename " + this.props.VideoVersion)
        let backend_url = this.web_data_url

        if (this.props.VideoVersion === "4") {
            //return backend_url + "/data/video4.mp4"
            console.log("/hls/obs_stream.m3u8")
            return backend_url + "/hls/obs_stream.m3u8"
        } else if (this.props.VideoVersion === "5") {
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
                return this.getVideoType()
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
