import React from 'react';
import classnames from 'classnames';
import windowParameter from '../../utilities/windowParameter';

interface LaneNumberFinishInterface {
    laneNumber: string;
    place?: string;
}

export default class LaneNumberFinish extends React.Component<LaneNumberFinishInterface, {}> {

    windowParams: windowParameter;
    constructor(props: LaneNumberFinishInterface) {
        super(props);
        this.windowParams = new windowParameter();
    }

    getSwimmerSVG() {
        if (this.props.place === undefined) {
            return <g id='layericon' transform="translate(67,16) rotate(90) scale(0.8)">
                <path d="M23 5.5V20c0 2.2-1.8 4-4 4h-7.3c-1.08 0-2.1-.43-2.85-1.19L1 14.83s1.26-1.23 1.3-1.25c.22-.19.49-.29.79-.29.22 0 .42.06.6.16.04.01 4.31 2.46 4.31 2.46V4c0-.83.67-1.5 1.5-1.5S11 3.17 11 4v7h1V1.5c0-.83.67-1.5 1.5-1.5S15 .67 15 1.5V11h1V2.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V11h1V5.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5z"></path>
            </g>
        }
        if (this.props.place === null || this.props.place === '') {
            return <g id='layericon' transform="translate(40,15) rotate(0)">
                <path d="M6.11 5.56C7.3 5.7 8.14 6.14 9 7l1 1-3.25 3.25c.31.12.56.27.77.39.37.23.59.36 1.15.36s.78-.13 1.15-.36c.46-.27 1.08-.64 2.19-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36.55 0 .78-.13 1.15-.36.12-.07.26-.15.41-.23L10.48 5C9.22 3.74 8.04 3.2 6.3 3.05 5.6 2.99 5 3.56 5 4.26v.09c0 .63.49 1.13 1.11 1.21zm15.24 13.35c-.17-.06-.32-.15-.5-.27-.45-.27-1.07-.64-2.18-.64s-1.73.37-2.18.64c-.37.23-.6.36-1.15.36-.55 0-.78-.14-1.15-.36-.45-.27-1.07-.64-2.18-.64s-1.73.37-2.19.64c-.37.23-.59.36-1.15.36s-.78-.13-1.15-.36c-.45-.27-1.07-.64-2.18-.64s-1.73.37-2.19.64c-.18.11-.33.2-.5.27-.38.13-.65.45-.65.85v.12c0 .67.66 1.13 1.3.91.37-.13.65-.3.89-.44.37-.22.6-.35 1.15-.35.55 0 .78.13 1.15.36.45.27 1.07.64 2.18.64s1.73-.37 2.19-.64c.37-.23.59-.36 1.15-.36.55 0 .78.14 1.15.36.45.27 1.07.64 2.18.64s1.72-.37 2.18-.64c.37-.23.59-.36 1.15-.36.55 0 .78.14 1.15.36.23.14.51.31.88.44.63.22 1.3-.24 1.3-.91v-.12c0-.41-.27-.73-.65-.86zM3.11 16.35c.47-.13.81-.33 1.09-.49.37-.23.6-.36 1.15-.36.55 0 .78.14 1.15.36.45.27 1.07.64 2.18.64s1.73-.37 2.18-.64c.37-.23.59-.36 1.15-.36.55 0 .78.14 1.15.36.45.27 1.07.64 2.18.64s1.73-.37 2.18-.64c.37-.23.59-.36 1.15-.36.55 0 .78.14 1.15.36.23.14.5.3.85.43.63.23 1.31-.24 1.31-.91v-.12c0-.4-.27-.72-.64-.86-.17-.06-.32-.15-.51-.26-.45-.27-1.07-.64-2.18-.64s-1.73.37-2.18.64c-.37.23-.6.36-1.15.36s-.78-.14-1.15-.36c-.45-.27-1.07-.64-2.18-.64s-1.73.37-2.18.64c-.37.23-.59.36-1.15.36-.55 0-.78-.14-1.15-.36-.45-.27-1.07-.64-2.18-.64s-1.73.37-2.18.64c-.18.11-.33.2-.5.27-.38.13-.65.45-.65.85v.23c0 .58.55 1.02 1.11.86z"></path>
                <circle cx="16.5" cy="5.5" r="2.5"></circle>
            </g>
        }
    }

    getPlaceSVG() {
        let textnumbersvg = classnames('textnumbersvg');
        let gradient_lane = classnames('gradient_lane');
        let gradient_place = classnames('gradient_place');
        let textplacesvg = classnames('textplacesvg');
        let gradient_name = classnames('gradient_name');

        let diagonal = this.windowParams.getBoxDiaganol();
        let textfromleft = 8

        let viewBoxSize = "0 0 " + (2 * this.windowParams.getBoxNumberWidth()) + "  " + this.windowParams.getBoxheight()
        let path_lane = "M " + this.windowParams.getPictureStart() + "  0 h " + this.windowParams.getBoxNumberWidth() + " l -" + diagonal + "," + this.windowParams.getBoxheight() + " h -" + (this.windowParams.getBoxNumberWidth() - diagonal) + " z"
        let path_place = "M " + this.windowParams.getBoxNumberWidth() + " 0 h " + this.windowParams.getBoxNumberWidth() + " l -" + diagonal + "," + this.windowParams.getBoxheight() + " h -" + this.windowParams.getBoxNumberWidth() + " z"
        
        let fill_start= 2 * this.windowParams.getBoxNumberWidth()
        
        let path_fill = "M "+ fill_start +" 0 h 0 l 0," + this.windowParams.getBoxheight() + " h -" + diagonal + " z"

        return <svg
            xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet"
            id="svg8"
            version="1.1"
            viewBox={viewBoxSize}
            height={this.windowParams.getBoxheight()}
        >
            <defs>
                <linearGradient id="laneNumberFinishPlaceGradient" gradientTransform="rotate(0)">
                    <stop
                        className={gradient_lane}
                        offset="0"
                        stopOpacity="1"
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
                    id="laneNumberFinishPlaceFill"
                    xlinkHref="#laneNumberFinishPlaceGradient"
                />
                <linearGradient id="placeNumberFinishPlaceGradient" gradientTransform="rotate(0)">
                    <stop
                        className={gradient_place}
                        offset="0"
                        stopOpacity="1"
                    />
                    <stop
                        className={gradient_place}
                        offset="1"
                        stopOpacity="0"
                    />
                </linearGradient>
                <linearGradient
                    gradientUnits="userSpaceOnUse"
                    y2="2"
                    x2="100"
                    y1="-10"
                    x1="70"
                    id="placeNumberFinishPlaceFill"
                    xlinkHref="#placeNumberFinishPlaceGradient"
                />
            </defs>
            <g id="layerplace">
                <path
                    transform="scale(1)"
                    d={path_lane}
                    fill="url(#laneNumberFinishPlaceFill)"
                />
                <text
                    className={textnumbersvg}
                    y={this.windowParams.getBoxTextFromTop()}
                    x={textfromleft}
                >
                    {this.props.laneNumber} </text>
            </g>
            <g id="layerplace">
                <path
                    transform="scale(1)"
                    d={path_place}
                    fill="url(#placeNumberFinishPlaceFill)"
                />
                <text
                    className={textplacesvg}
                    y={this.windowParams.getBoxTextFromTop()}
                    x={this.windowParams.getBoxNumberWidth() + 4}
                >
                    {this.props.place}</text>
            </g>
            {this.getSwimmerSVG()}
            <g id="layerfill">
                <path
                    transform="scale(1)"
                    d={path_fill}
                    className={gradient_name}
                />
            </g>

        </svg>

    }

    render() {
        return (
            this.getPlaceSVG()
        );
    }
}




