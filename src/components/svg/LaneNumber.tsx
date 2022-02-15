import React from 'react';
import classnames from 'classnames';
import windowParameter from '../../utilities/windowParameter';

interface LaneNumberInterface {
    laneNumber: string;
}

export default class LaneNumber extends React.Component<LaneNumberInterface, {}> {

    windowParams: windowParameter;

    constructor(props: LaneNumberInterface) {
        super(props);
        this.windowParams = new windowParameter();
    }

    render() {
        let textnumbersvg = classnames('textnumbersvg');
        let gradient_lane = classnames('gradient_lane');

        let viewBoxSize = "0 0 48 " + this.windowParams.getBoxViewheight()

        let boxwidth = 40
        let diagonal = 15
        let textfromleft = 5
        let path_lane = "M 0 0 h " + boxwidth + " l -" + diagonal + "," + this.windowParams.getBoxheight() + " h -" + (boxwidth - diagonal) + " z"

        return (<svg
            xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"
            id="svg8"
            version="1.1"
            viewBox={viewBoxSize}
            height={this.windowParams.getBoxViewheight()}>
            <defs>
                <linearGradient id="laneNumberGradient" gradientTransform="rotate(0)">
                    <stop
                        className={gradient_lane}
                    />
                    <stop
                        className={gradient_lane}
                        offset="1"
                        stopOpacity="0"
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
                id="layer1">
                <path
                    transform="scale(1)"
                    d={path_lane}
                    fill="url(#laneGradientStyle)"
                />
                <text
                    className={textnumbersvg}
                    x={textfromleft}
                    y={this.windowParams.getBoxTextFromTop()}
                >
                    {this.props.laneNumber}</text>
            </g>
        </svg>
        );
    }
} 