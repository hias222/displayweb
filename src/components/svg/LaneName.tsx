import React from 'react';
import classnames from 'classnames';


interface LaneNameInterface {
    LaneName: string;
    laneStartPoint: number;
    laneEndSpace: number;
}

export default class LaneName extends React.Component<LaneNameInterface, {}> {

    window_width: number;
    window_height: number;
    //PIXEL_FROM_TOP
    window_top_pixel: number;

    constructor(props: LaneNameInterface) {
        super(props);
        this.window_width = process.env.REACT_APP_PIXEL_WIDTH !== undefined ? Number(process.env.REACT_APP_PIXEL_WIDTH) : 512
        this.window_height = process.env.REACT_APP_PIXEL_HEIGHT !== undefined ? Number(process.env.REACT_APP_PIXEL_HEIGHT) : 384
        this.window_top_pixel = process.env.REACT_APP_PIXEL_FROM_TOP !== undefined ? Number(process.env.REACT_APP_PIXEL_FROM_TOP) : 0
    }

    render() {
        let textlanesvg = classnames('textlanesvg');
        let gradient_name = classnames('gradient_name');

        let length = this.window_width - this.props.laneStartPoint - this.props.laneEndSpace
        let viewHeight = 48
        
        let boxheight = 45

        let viewBoxSize = "0 0 " + length + " " + viewHeight
        let boxSize = "M 0 0 h " + length + " v " + boxheight + " h -" + length + " z"

        return (<svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMaxYMax meet"
            id="svg8"
            version="1.1"
            viewBox={viewBoxSize}
            height={viewHeight}
        >

            <g id="layer1">
                <path
                    transform="scale(1)"
                    className={gradient_name}
                    d={boxSize}
                />
                <text
                    className={textlanesvg}
                    y="30"
                    x="3"
                >
                    {this.props.LaneName}</text>
            </g>
        </svg>
        );
    }
}