import React from 'react';
import classnames from 'classnames';
import windowParameter from '../../../utilities/windowParameter';

interface LaneNumberInterface {
    laneNumber: string;
}

export default class RankNumber extends React.Component<LaneNumberInterface, {}> {

    windowParams: windowParameter;

    constructor(props: LaneNumberInterface) {
        super(props);
        this.windowParams = new windowParameter();
    }

    render() {
        let textranksvg = classnames('textranksvg');
        let gradient_lane = classnames('gradient_lane');
        let gradient_lane_stop = classnames('gradient_lane_stop');
        let gradient_name = classnames('gradient_name');

        let viewBoxSize = "0 0 " + this.windowParams.getBoxNumberWidth() + " " + this.windowParams.getBoxheight()

        let boxwidth = this.windowParams.getBoxNumberWidth();
        let diagonal = this.windowParams.getBoxDiaganol();
        let textfromleft = this.windowParams.getLaneNumberTextFromLeft();

        let path_lane = "M " + this.windowParams.getPictureStart() + " 0 h " + boxwidth + " l -" + diagonal + "," + this.windowParams.getBoxheight() + " h -" + (boxwidth - diagonal) + " z"

        let fill_start= this.windowParams.getBoxNumberWidth() + this.windowParams.getPictureStart()
        let path_fill = "M "+ fill_start +" 0 h 0 l 0," + this.windowParams.getBoxheight() + " h -" + diagonal + " z"

        return (<svg
            xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"
            id="svg8"
            version="1.1"
            viewBox={viewBoxSize}
            height={this.windowParams.getBoxheight()}>
            <defs>
                <linearGradient id="laneNumberGradient" gradientTransform="rotate(0)">
                    <stop
                        className={gradient_lane}
                        offset="0"
                    />
                    <stop
                        className={gradient_lane_stop}
                         offset="0"
                    />
                </linearGradient>
                <linearGradient
                    gradientUnits="userSpaceOnUse"
                    y2="2"
                    x2="50"
                    y1="-10"
                    x1="20"
                    id="laneGradientStyle"
                    xlinkHref="#laneNumberGradient"
                />
            </defs>
            <g
                id="layernumber1">
                <path
                    transform="scale(1)"
                    d={path_lane}
                    fill="url(#laneGradientStyle)"
                />
                <text
                    className={textranksvg}
                    x={textfromleft}
                    y={this.windowParams.getBoxTextFromTop()}
                >
                    {this.props.laneNumber}.</text>
            </g>
            <g id="layerfill">
                <path
                    transform="scale(1)"
                    d={path_fill}
                    className={gradient_name}
                />
            </g>
        </svg>
        );
    }
} 