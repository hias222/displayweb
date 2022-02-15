import React from 'react';
import classnames from 'classnames';
import windowParameter from '../../utilities/windowParameter';


interface LaneTimeInterface {
    LaneTime: string;
    laneStartPoint: number;
}

export default class LaneTime extends React.Component<LaneTimeInterface, {}> {
    windowParams: windowParameter;

    constructor(props: LaneTimeInterface) {
        super(props);
        this.windowParams = new windowParameter();
    }

    render() {
        let textlanesvg = classnames('textlanesvg');
        let gradient_name = classnames('gradient_name');

        let length = this.windowParams.getWindowWidth() - this.props.laneStartPoint
        let boxheight = this.windowParams.getBoxheight()

        let viewBoxSize = "0 0 " + length + " " + this.windowParams.getBoxViewheight()
        let boxSize = "M 0 0 h " + length + " v " + boxheight + " h -" + length + " z"

        return (<svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMaxYMax meet"
            id="svg8"
            version="1.1"
            viewBox={viewBoxSize}
            height={this.windowParams.getBoxViewheight()}
        >
            <g id="layer1">
                <path
                    transform="scale(1)"
                    className={gradient_name}
                    d={boxSize}
                />
                <text
                    className={textlanesvg}
                    y={this.windowParams.getBoxTextFromTop()}
                    x="3"
                >
                    {this.props.LaneTime}</text>
            </g>
        </svg>
        );
    }
}