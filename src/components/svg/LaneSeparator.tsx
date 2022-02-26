import React from 'react';
import classnames from 'classnames';
import windowParameter from '../../utilities/windowParameter';


interface LaneSeparatorInterface {
    keyindex: number;
    IsEnabled: boolean;
}

export default class LaneSeparator extends React.Component<LaneSeparatorInterface, {}> {

    windowParams: windowParameter;

    constructor(props: LaneSeparatorInterface) {
        super(props);
        this.windowParams = new windowParameter();
    }

    render() {

        let length = this.windowParams.getPictureLength();

        let separatorsvg = classnames('separatorsvg');

        let seapartorname = this.props.keyindex === undefined ? "separator" : "separator" + this.props.keyindex

        let viewBoxSize = "0 0 " + this.windowParams.getWindowWidth() + " " + this.windowParams.getSeparatorHeight()
        let boxSize = "M " + this.windowParams.getPictureStart() + " 0 h " + length + " v " + this.windowParams.getSeparatorHeight() + " h -" + length + " z"

        return (<svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMaxYMax meet"
            id="svg8"
            version="1.1"
            viewBox={viewBoxSize}
        >
            <defs>
            <linearGradient id="separatorGradient" gradientTransform="rotate(0)">
                    <stop
                        className={separatorsvg}
                        offset="0"
                        stopOpacity="1"
                    />
                    <stop
                        className={separatorsvg}
                        offset="1"
                        stopOpacity="0"
                    />
                </linearGradient>
                <linearGradient
                    gradientUnits="userSpaceOnUse"
                    y2="0"
                    x2={this.windowParams.getPictureLength()}
                    y1="0"
                    x1="0"
                    id="separatorFill"
                    xlinkHref="#separatorGradient"
                />
            </defs>
            <g id={seapartorname} >
                <path
                    transform="scale(1)"
                    className={separatorsvg}
                    fill="url(#separatorFill)"
                    d={boxSize}
                />
            </g>
        </svg>
        );
    }
}