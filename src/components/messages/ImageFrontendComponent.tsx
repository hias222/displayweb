import React from "react";

//import classnames from 'classnames';

export interface VideoInterface {
    videoURL: string;
    width: string;
    height: string;
    type: string;
}

export class ImageFrontendComponent extends React.Component<VideoInterface, {}> {

    render() {
        //let videotable = classnames('videotable-variable');

        return (
            <img 
            width={this.props.width}
            height={this.props.height}
            src={this.props.videoURL} 
            alt={this.props.videoURL}/>
        )
    }
}