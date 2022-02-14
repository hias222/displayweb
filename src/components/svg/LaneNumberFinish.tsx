import React from 'react';
import classnames from 'classnames';

interface LaneNumberFinishInterface {
    laneNumber: string;
    place?: string;
}

export default class LaneNumberFinish extends React.Component<LaneNumberFinishInterface, {}> {

    window_width: number;
    window_height: number;
    //PIXEL_FROM_TOP
    window_top_pixel: number;

    boxwidth: number;

    constructor(props: LaneNumberFinishInterface) {
        super(props);
        this.window_width = process.env.REACT_APP_PIXEL_WIDTH !== undefined ? Number(process.env.REACT_APP_PIXEL_WIDTH) : 512
        this.window_height = process.env.REACT_APP_PIXEL_HEIGHT !== undefined ? Number(process.env.REACT_APP_PIXEL_HEIGHT) : 384
        this.window_top_pixel = process.env.REACT_APP_PIXEL_FROM_TOP !== undefined ? Number(process.env.REACT_APP_PIXEL_FROM_TOP) : 0

        this.boxwidth = 45;
    }

    getLaneSVG() {
        let textnumbersvg = classnames('textnumbersvg');
        let gradient_lane = classnames('gradient_lane');
        let boxlanesvg = classnames('boxlanesvg');

        let height = 48;

        let viewBoxSize = "0 0 " + (2 * this.boxwidth) + " " + height

        let boxheight = 45
        let diagonal = 15
        let textfromtop = 35
        let textfromleft = 5
        let path_lane = "M 0 3 h " + this.boxwidth + " l -" + diagonal + "," + boxheight + " h -" + (this.boxwidth - diagonal) + " z"

        return <svg
            xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet"
            id="svg8"
            version="1.1"
            viewBox={viewBoxSize}
            height={height}
        >
            <defs>
                <linearGradient id="LaneNumberFinishLaneGradient" gradientTransform="rotate(0)">
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
                    id="laneNumberFinishLaneFill"
                    xlinkHref="#LaneNumberFinishLaneGradient"
                />
            </defs>
            <g
                id="layer1">
                <path
                    transform="scale(1)"
                    d={path_lane}
                    fill="url(#laneNumberFinishLaneFill)"
                    className={boxlanesvg}
                />
                <text
                    className={textnumbersvg}
                    y={textfromtop}
                    x={textfromleft}
                >
                    {this.props.laneNumber}</text>
            </g>
        </svg>

    }

    getPlaceSVG() {
        let textnumbersvg = classnames('textnumbersvg');
        let gradient_lane = classnames('gradient_lane');
        let gradient_place = classnames('gradient_place');
        let textplacesvg = classnames('textplacesvg');

        let height = 48;
        let boxheight = 45
        let diagonal = 15
        let textfromtop = 35
        let textfromleft = 5
        let viewBoxSize = "0 0 " + (2 * this.boxwidth) + "  " + height
        let path_lane = "M 0 3 h " + this.boxwidth + " l -" + diagonal + "," + boxheight + " h -" + (this.boxwidth - diagonal) + " z"
        let path_place = "M " + this.boxwidth + " 3 h " + this.boxwidth + " l -" + diagonal + "," + boxheight + " h -" + this.boxwidth + " z"

        return <svg
            xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet"
            id="svg8"
            version="1.1"
            viewBox={viewBoxSize}
            height={height}
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
                    y={textfromtop}
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
                    y={textfromtop}
                    x={this.boxwidth + textfromleft}
                >
                    {this.props.place}</text>
            </g>
        </svg>
    }

    render() {
        if (this.props.place === null || typeof this.props.place === 'undefined' || this.props.place === '') {
            return (
                this.getLaneSVG()
            );
        }
        else {
            return (
                this.getPlaceSVG()
            );

        }

    }

}