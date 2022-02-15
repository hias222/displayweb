import React from 'react';
import classnames from 'classnames';
import windowParameter from '../../utilities/windowParameter';


interface HeaderTimeInterface {
    EventName: string;
    Time: string;
}

export default class headertimeline extends React.Component<HeaderTimeInterface, {}> {
    windowParams: windowParameter;
    constructor(props: HeaderTimeInterface) {
        super(props);
        this.windowParams = new windowParameter();
    }

    render() {
        let headertimeline = classnames('headertimeline');
        let gradient_name = classnames('gradient_name');

        let viewlength = this.windowParams.getWindowWidth()
        let internallength = this.windowParams.getWindowWidth() - (2 * this.windowParams.getPictureStart())

        let height = 30;

        let viewBoxSize = "0 0 " + viewlength + " " + height
        let boxSize = "M " + this.windowParams.getPictureStart() + " 0 h " + internallength + " v " + height + " h -" + internallength + " z"

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
                    x={this.windowParams.getPictureStart() + 3 }
                >
                    {this.props.EventName}</text>

                <text
                    className={headertimeline}
                    y={height - 5}
                    x={internallength}
                    textAnchor="end"
                >
                    {this.props.Time}</text>
            </g>
        </svg>
        );
    }
}