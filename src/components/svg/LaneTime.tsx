import React from 'react';
import classnames from 'classnames';
import windowParameter from '../../utilities/windowParameter';


interface LaneTimeInterface {
    LaneTime: string;
}

export default class LaneTime extends React.Component<LaneTimeInterface, {}> {
    windowParams: windowParameter;

    constructor(props: LaneTimeInterface) {
        super(props);
        this.windowParams = new windowParameter();
    }

    render() {
        let texttimesvg = classnames('texttimesvg');
        let gradient_name = classnames('gradient_name');

        let length = this.windowParams.getBoxTimeLaneWidth()
        let boxheight = this.windowParams.getBoxheight()

        let viewBoxSize = "0 0 " + length + " " + this.windowParams.getBoxheight()
        let boxSize = "M 0 0 h " + length + " v " + boxheight + " h -" + length + " z"

        //console.log('---> LaneTime <---- ' + this.props.LaneTime)

        return (<svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMaxYMax meet"
            id="svg8"
            version="1.1"
            viewBox={viewBoxSize}
            height={this.windowParams.getBoxheight()}
        >
            <g id="layer1">
                <path
                    transform="scale(1)"
                    className={gradient_name}
                    d={boxSize}
                />
                <text
                    className={texttimesvg}
                    y={this.windowParams.getBoxTextFromTop()}
                    x={this.windowParams.getBoxTimeLaneWidth()}
                    textAnchor='end'
                >
                    {this.props.LaneTime}</text>
            </g>
        </svg>
        );
    }
}