import React from 'react';
import classnames from 'classnames';


interface HeaderNameInterface {
    HeaderName: string;
}

export default class HeaderBoxName extends React.Component<HeaderNameInterface, {}> {

    window_width: number;
    window_height: number;
    //PIXEL_FROM_TOP
    window_top_pixel: number;

    constructor(props: HeaderNameInterface) {
        super(props);
        this.window_width = process.env.REACT_APP_PIXEL_WIDTH !== undefined ? Number(process.env.REACT_APP_PIXEL_WIDTH) : 512
        this.window_height = process.env.REACT_APP_PIXEL_HEIGHT !== undefined ? Number(process.env.REACT_APP_PIXEL_HEIGHT) : 384
        this.window_top_pixel = process.env.REACT_APP_PIXEL_FROM_TOP !== undefined ? Number(process.env.REACT_APP_PIXEL_FROM_TOP) : 0
    }

    render() {
        let textHeaderHeatEventsvg = classnames('textHeaderHeatEventsvg');
        let gradient_name = classnames('gradient_name');

        let length = this.window_width / 2 - 5;
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
                    className={textHeaderHeatEventsvg}
                    y={height - 5}
                    x="3"
                >
                    {this.props.HeaderName}</text>
            </g>
        </svg>
        );
    }
}