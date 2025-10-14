import React from 'react';
import classnames from 'classnames';
import windowParameter from '../../utilities/windowParameter';


interface RowSeparatorInterface {
    keyindex: string;
}

export default class RowSeparator extends React.Component<RowSeparatorInterface, {}> {

    windowParams: windowParameter;

    constructor(props: RowSeparatorInterface) {
        super(props);
        this.windowParams = new windowParameter();
    }

    render() {

        //let viewBoxSize = "0 0 1 1 "
        //let boxSize = "M 0 0 h 1 v 1 h -1 z"

        let viewBoxSize = "0 0 " + this.windowParams.getPictureStart() + "  " + this.windowParams.getBoxheight()
        let boxSize = "M 0 0 h " + this.windowParams.getBoxNumberWidth() + " l -0 ," + this.windowParams.getBoxheight() + " h -" + this.windowParams.getBoxNumberWidth() + " z"

        let gradient_lane = classnames('gradient_lane');
        let gradient_lane_stop = classnames('gradient_lane_stop');

        let separatorsvg = classnames('separatorsvg');
        let seapartorname = this.props.keyindex === undefined ? "separator" : "separator" + this.props.keyindex

        return (<svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMaxYMax meet"
            id="svg8"
            version="1.1"
            viewBox={viewBoxSize}
            height={this.windowParams.getBoxheight()}
        >
            <defs>
            <linearGradient id="laneRowGradientStyle" gradientTransform="rotate(0)">
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
                    id="rowlaneGradientStyle"
                    xlinkHref="#laneRowGradientStyle"
                />
            </defs>
            <g id={seapartorname} >
                <path
                    transform="scale(1)"
                    className={gradient_lane}
                    fill="url(#rowlaneGradientStyle)"
                    d={boxSize}
                />
            </g>
        </svg>
        );
    }
}