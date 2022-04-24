import React from 'react';
import classnames from 'classnames';
import windowParameter from '../../../utilities/windowParameter';


interface RankTimeInterface {
    Time: string;
    IsOnlyBox: boolean;
}

export default class RankTime extends React.Component<RankTimeInterface, {}> {

    windowParams: windowParameter;

    constructor(props: RankTimeInterface) {
        super(props);
        this.windowParams = new windowParameter();
    }
    
    render() {
        let textlanesvg = classnames('textlanesvg');
        let gradient_name = classnames('gradient_name');

        let time_length = this.windowParams.getPictureLength() + this.windowParams.getPictureStart() - (2 * this.windowParams.getBoxNumberWidth()) - this.windowParams.getBoxTimeLaneWidth();
        let length = this.props.IsOnlyBox === true ? this.windowParams.getPictureLength() + this.windowParams.getPictureStart() - this.windowParams.getBoxNumberWidth() : time_length
        let boxheight = this.windowParams.getBoxheight();

        let viewBoxSize = "0 0 " + length + " " + this.windowParams.getBoxheight()
        let boxSize = "M 0 0 h " + length + " v " + boxheight + " h -" + (length + 30) + " z"

        return (<svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMaxYMax meet"
            id="svg8"
            version="1.1"
            viewBox={viewBoxSize}
            height={this.windowParams.getBoxheight()}
        >

            <g id="LaneName1">
                <path
                    transform="scale(1)"
                    className={gradient_name}
                    d={boxSize}
                />
                <text
                    className={textlanesvg}
                    y={this.windowParams.getBoxTextFromTop()}
                    x={this.windowParams.getPictureStart()}
                >
                    {this.props.Time}</text>

            </g>
        </svg>
        );
    }
}