import React from "react";
import ReactPlayer from 'react-player'

import classnames from 'classnames';

export interface VideoInterface {
    videoURL: string;
    width: string;
    height: string;
}

export class ObsFrontendComponent extends React.Component<VideoInterface, {}> {

    render() {
        let videotable = classnames('videotable-variable');

        return (
            <ReactPlayer
                className={videotable}
                loop={true}
                height={this.props.height}
                width={this.props.width}
                ref="vidRef"
                url={this.props.videoURL}
                playing={true}
            />
        )
    }
}