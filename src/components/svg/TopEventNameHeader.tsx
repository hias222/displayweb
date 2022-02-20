import React from 'react';
import classnames from 'classnames';
import windowParameter from '../../utilities/windowParameter';


interface EventNameInterface {
    EventName: string;
}

export default class TopEventNameHeader extends React.Component<EventNameInterface, {}> {
    windowParams: windowParameter;

    constructor(props: EventNameInterface) {
        super(props);
        this.windowParams = new windowParameter();
    }

    render() {
        let textWKNamesvg = classnames('textWKNamesvg');
        let gradient_name = classnames('gradient_name');

        let length = this.windowParams.getHeaderWidth();
        let height = 30;
        let top_space = 3;
        let button_space = height - top_space;

        let viewBoxSize = "0 0 " + length + " " + height
        let boxSize = "M 0 " + top_space + " h " + this.windowParams.getHeaderWidth() + " v " + button_space + " h -" + this.windowParams.getPictureLength() + " z"

        return (<svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMaxYMax meet"
            id="svg8"
            version="1.1"
            viewBox={viewBoxSize}
            height={height}
        >
            <g id="topeventheadername">
                <path
                    className={gradient_name}
                    transform="scale(1)"
                    d={boxSize}
                />
                <text
                    className={textWKNamesvg}
                    y={height - 5}
                    x={this.windowParams.getPictureMiddle()}
                >
                    {this.props.EventName}</text>
            </g>
        </svg>
        );
    }
}