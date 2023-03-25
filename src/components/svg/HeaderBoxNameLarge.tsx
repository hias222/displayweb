import React from 'react';
import classnames from 'classnames';
import windowParameter from '../../utilities/windowParameter';


interface HeaderNameInterface {
    HeaderName: string;
    Parts: number;
    IsFirstText: boolean;
}

export default class HeaderBoxNameLarge extends React.Component<HeaderNameInterface, {}> {
    windowParams: windowParameter;
    constructor(props: HeaderNameInterface) {
        super(props);
        this.windowParams = new windowParameter();
    }

    render() {
        let textHeaderHeatEventLarge = classnames('textHeaderHeatEventLarge');
        let gradient_name = classnames('gradient_name');

        let internallength = this.props.IsFirstText === true ? this.windowParams.getBoxWidth(this.props.Parts) + this.windowParams.getPictureStart() : this.windowParams.getBoxWidth(this.props.Parts)
        let viewlength = this.props.IsFirstText === true ? this.windowParams.getBoxWidth(this.props.Parts) + this.windowParams.getPictureStart() : this.windowParams.getBoxWidth(this.props.Parts)
        let height = this.windowParams.getTopRowHeight() * 1.9;

        let startpoint = this.props.IsFirstText === true ? this.windowParams.getPictureStart() : 0

        let viewBoxSize = "0 0 " + viewlength + " " + height
        let boxSize = "M " + startpoint + " 0 h " + internallength + " v " + height + " h -" + internallength + " z"


        return (<svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMaxYMax meet"
            id="svg8"
            version="1.1"
            viewBox={viewBoxSize}
            height={height}
        >
            <g id="headeboxname">
                <path
                    transform="scale(1)"
                    className={gradient_name}
                    d={boxSize}
                />
                <text
                    className={textHeaderHeatEventLarge}
                    y={height - 14}
                    x={this.windowParams.getBoxWidth(this.props.Parts) - 3}
                >
                    {this.props.HeaderName}</text>
            </g>
        </svg>
        );
    }
}