import React from 'react';
import classnames from 'classnames';


interface HeaderTimeInterface {
    EventName: string;
    Time: string;
}

export default class headertimeline extends React.Component<HeaderTimeInterface, {}> {

    window_width: number;
    window_height: number;
    //PIXEL_FROM_TOP
    window_top_pixel: number;

    constructor(props: HeaderTimeInterface) {
        super(props);
        this.window_width = process.env.REACT_APP_PIXEL_WIDTH !== undefined ? Number(process.env.REACT_APP_PIXEL_WIDTH) : 512
        this.window_height = process.env.REACT_APP_PIXEL_HEIGHT !== undefined ? Number(process.env.REACT_APP_PIXEL_HEIGHT) : 384
        this.window_top_pixel = process.env.REACT_APP_PIXEL_FROM_TOP !== undefined ? Number(process.env.REACT_APP_PIXEL_FROM_TOP) : 0
    }

    render() {
        let headertimeline = classnames('headertimeline');
        let gradient_name = classnames('gradient_name');

        let length = this.window_width - 10;
        let height = 30;

        let viewBoxSize = "0 0 " + length + " " + height
        let boxSize = "M 0 0 h " + length + " v " + height + " h -" + length + " z"

        return (<svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMaxYMax meet"
            id="svg8"
            version="1.1"
            viewBox={viewBoxSize}
            height={height}
        >
            <g id="layer3">
                <path
                    className={gradient_name}
                    transform="scale(1)"
                    d={boxSize}
                />
            </g>
            <g id="layer1">
                <path
                    transform="scale(1)"
                    className={gradient_name}
                    d={boxSize}
                />
                <text
                    className={headertimeline}
                    y={height - 5}
                    x="3"
                >
                    {this.props.EventName}</text>

                <text
                    className={headertimeline}
                    y={height - 5}
                    x={length}
                    text-anchor="end"
                >
                    {this.props.Time}</text>
            </g>
        </svg>
        );
    }
}