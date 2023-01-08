import React from 'react';
import classnames from 'classnames';
import windowParameter from '../../utilities/windowParameter';


interface HeaderTimeInterface {
    Time: string;
    Parts: number;
    IsFirstText: boolean;
    Round: number;
}

export default class headertimeline extends React.Component<HeaderTimeInterface, {}> {
    windowParams: windowParameter;
    constructor(props: HeaderTimeInterface) {
        super(props);
        this.windowParams = new windowParameter();
    }

    getRoundValue() {
        if (this.props.Round > 0) {
            return this.props.Round.toString() + 'm'
        } else {
            return ''
        }
    }

    render() {
        let headertimeline = classnames('headertimeline');

        let gradient_name = classnames('gradient_name');

        let viewlength = this.windowParams.getBoxWidth(this.props.Parts)
        let internallength = this.windowParams.getBoxWidth(this.props.Parts)

        let startpoint = this.props.IsFirstText === true ? this.windowParams.getPictureStart() : 0

        let height = this.windowParams.getTopRowHeight();

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
            <g id="layer1">
                <path
                    transform="scale(1)"
                    className={gradient_name}
                    d={boxSize}
                />
                <text
                    className={headertimeline}
                    y={height - 5}
                    x={internallength}
                    textAnchor="end"
                >
                    {this.props.Time}</text>

                <text
                    className={headertimeline}
                    y={height - 5}
                    x={0}
                    textAnchor="begin"
                >
                    {this.getRoundValue()}</text>
            </g>
        </svg>
        );
    }
}