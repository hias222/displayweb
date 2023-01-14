import React from 'react';
import classnames from 'classnames';
import windowParameter from '../../utilities/windowParameter';

interface LaneNumberFinishInterface {
    laneNumber: string;
    place?: string;
}

export default class LaneNumberFinishEasy extends React.Component<LaneNumberFinishInterface, {}> {

    windowParams: windowParameter;
    constructor(props: LaneNumberFinishInterface) {
        super(props);
        this.windowParams = new windowParameter();
    }

    getSwimmerSVG() {
        let gradient_icon = classnames('gradient_icon');
        let let_transform_1 = this.windowParams.getBoxNumberWidth() + this.windowParams.getLaneNumberTextFromLeft()
        let let_transform_2 = Math.round(this.windowParams.getBoxheight() / 3) // 15
        let scale_factor = this.windowParams.getBoxScaleFactorh()
        let transform = "translate(" + let_transform_1 + "," + let_transform_2 + ") rotate(0) scale(" + scale_factor + ")"
        //let let_transform_1=40

        if (this.props.place === undefined) {
            return <g id='layericon' transform={transform}>
                <path d="M6.11 5.56C7.3 5.7 8.14 6.14 9 7l1 1-3.25 3.25c.31.12.56.27.77.39.37.23.59.36 1.15.36s.78-.13 1.15-.36c.46-.27 1.08-.64 2.19-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36.55 0 .78-.13 1.15-.36.12-.07.26-.15.41-.23L10.48 5C9.22 3.74 8.04 3.2 6.3 3.05 5.6 2.99 5 3.56 5 4.26v.09c0 .63.49 1.13 1.11 1.21zm15.24 13.35c-.17-.06-.32-.15-.5-.27-.45-.27-1.07-.64-2.18-.64s-1.73.37-2.18.64c-.37.23-.6.36-1.15.36-.55 0-.78-.14-1.15-.36-.45-.27-1.07-.64-2.18-.64s-1.73.37-2.19.64c-.37.23-.59.36-1.15.36s-.78-.13-1.15-.36c-.45-.27-1.07-.64-2.18-.64s-1.73.37-2.19.64c-.18.11-.33.2-.5.27-.38.13-.65.45-.65.85v.12c0 .67.66 1.13 1.3.91.37-.13.65-.3.89-.44.37-.22.6-.35 1.15-.35.55 0 .78.13 1.15.36.45.27 1.07.64 2.18.64s1.73-.37 2.19-.64c.37-.23.59-.36 1.15-.36.55 0 .78.14 1.15.36.45.27 1.07.64 2.18.64s1.72-.37 2.18-.64c.37-.23.59-.36 1.15-.36.55 0 .78.14 1.15.36.23.14.51.31.88.44.63.22 1.3-.24 1.3-.91v-.12c0-.41-.27-.73-.65-.86zM3.11 16.35c.47-.13.81-.33 1.09-.49.37-.23.6-.36 1.15-.36.55 0 .78.14 1.15.36.45.27 1.07.64 2.18.64s1.73-.37 2.18-.64c.37-.23.59-.36 1.15-.36.55 0 .78.14 1.15.36.45.27 1.07.64 2.18.64s1.73-.37 2.18-.64c.37-.23.59-.36 1.15-.36.55 0 .78.14 1.15.36.23.14.5.3.85.43.63.23 1.31-.24 1.31-.91v-.12c0-.4-.27-.72-.64-.86-.17-.06-.32-.15-.51-.26-.45-.27-1.07-.64-2.18-.64s-1.73.37-2.18.64c-.37.23-.6.36-1.15.36s-.78-.14-1.15-.36c-.45-.27-1.07-.64-2.18-.64s-1.73.37-2.18.64c-.37.23-.59.36-1.15.36-.55 0-.78-.14-1.15-.36-.45-.27-1.07-.64-2.18-.64s-1.73.37-2.18.64c-.18.11-.33.2-.5.27-.38.13-.65.45-.65.85v.23c0 .58.55 1.02 1.11.86z"
                    className={gradient_icon}
                />
                <circle cx="16.5" cy="5.5" r="2.5"
                    className={gradient_icon}
                ></circle>
            </g>
        }
        if (this.props.place === null || this.props.place === '') {
            return <g id='layericon' transform={transform}>
                <path d="M6.11 5.56C7.3 5.7 8.14 6.14 9 7l1 1-3.25 3.25c.31.12.56.27.77.39.37.23.59.36 1.15.36s.78-.13 1.15-.36c.46-.27 1.08-.64 2.19-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36.55 0 .78-.13 1.15-.36.12-.07.26-.15.41-.23L10.48 5C9.22 3.74 8.04 3.2 6.3 3.05 5.6 2.99 5 3.56 5 4.26v.09c0 .63.49 1.13 1.11 1.21zm15.24 13.35c-.17-.06-.32-.15-.5-.27-.45-.27-1.07-.64-2.18-.64s-1.73.37-2.18.64c-.37.23-.6.36-1.15.36-.55 0-.78-.14-1.15-.36-.45-.27-1.07-.64-2.18-.64s-1.73.37-2.19.64c-.37.23-.59.36-1.15.36s-.78-.13-1.15-.36c-.45-.27-1.07-.64-2.18-.64s-1.73.37-2.19.64c-.18.11-.33.2-.5.27-.38.13-.65.45-.65.85v.12c0 .67.66 1.13 1.3.91.37-.13.65-.3.89-.44.37-.22.6-.35 1.15-.35.55 0 .78.13 1.15.36.45.27 1.07.64 2.18.64s1.73-.37 2.19-.64c.37-.23.59-.36 1.15-.36.55 0 .78.14 1.15.36.45.27 1.07.64 2.18.64s1.72-.37 2.18-.64c.37-.23.59-.36 1.15-.36.55 0 .78.14 1.15.36.23.14.51.31.88.44.63.22 1.3-.24 1.3-.91v-.12c0-.41-.27-.73-.65-.86zM3.11 16.35c.47-.13.81-.33 1.09-.49.37-.23.6-.36 1.15-.36.55 0 .78.14 1.15.36.45.27 1.07.64 2.18.64s1.73-.37 2.18-.64c.37-.23.59-.36 1.15-.36.55 0 .78.14 1.15.36.45.27 1.07.64 2.18.64s1.73-.37 2.18-.64c.37-.23.59-.36 1.15-.36.55 0 .78.14 1.15.36.23.14.5.3.85.43.63.23 1.31-.24 1.31-.91v-.12c0-.4-.27-.72-.64-.86-.17-.06-.32-.15-.51-.26-.45-.27-1.07-.64-2.18-.64s-1.73.37-2.18.64c-.37.23-.6.36-1.15.36s-.78-.14-1.15-.36c-.45-.27-1.07-.64-2.18-.64s-1.73.37-2.18.64c-.37.23-.59.36-1.15.36-.55 0-.78-.14-1.15-.36-.45-.27-1.07-.64-2.18-.64s-1.73.37-2.18.64c-.18.11-.33.2-.5.27-.38.13-.65.45-.65.85v.23c0 .58.55 1.02 1.11.86z"
                />
                <circle cx="16.5" cy="5.5" r="2.5"></circle>
            </g>
        }
    }

    getPlaceSVG() {
        let textnumbersvg = classnames('textnumbersvg');
        let gradient_lane = classnames('gradient_lane');
        let gradient_lane_stop = classnames('gradient_lane_stop');
        let gradient_place = classnames('gradient_place');
        let gradient_place_stop = classnames('gradient_place_stop');
        let textplacesvg = classnames('textplacesvg');
        let gradient_name = classnames('gradient_name');

       let textfromleft = this.windowParams.getLaneNumberTextFromLeft();

        let viewBoxSize = "0 0 " + (2 * this.windowParams.getBoxNumberWidth()) + "  " + this.windowParams.getBoxheight()

        let path_lane = "M " + this.windowParams.getPictureStart() + "  0 h " + this.windowParams.getBoxNumberWidth() + " l -0," + this.windowParams.getBoxheight() + " h -" + (this.windowParams.getBoxNumberWidth()) + " z"
        let path_place = "M " + (this.windowParams.getBoxNumberWidth() + this.windowParams.getPictureStart()) + " 0 h " + (this.windowParams.getBoxNumberWidth() - this.windowParams.getPictureStart()) +
            " l -0," + this.windowParams.getBoxheight() + " h -" + (this.windowParams.getBoxNumberWidth() - this.windowParams.getPictureStart()) + " z"

        let fill_start = 2 * this.windowParams.getBoxNumberWidth()
        let path_fill = "M " + fill_start + " 0 h 0 l 0," + this.windowParams.getBoxheight() + " h -0 z"

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
                    />
                    <stop
                        className={gradient_lane_stop}
                        offset="1"
                    />
                </linearGradient>
                <linearGradient
                    gradientUnits="userSpaceOnUse"
                    y2="0"
                    x2="0"
                    y1={this.windowParams.getBoxheight()}
                    x1="0"
                    id="laneNumberFinishPlaceFill"
                    xlinkHref="#laneNumberFinishPlaceGradient"
                />
                <linearGradient id="placeNumberFinishPlaceGradient" gradientTransform="rotate(0)">
                    <stop
                        className={gradient_place}
                        offset="0"
                    />
                    <stop
                        className={gradient_place_stop}
                        offset="1"
                    />
                </linearGradient>
                <linearGradient
                    gradientUnits="userSpaceOnUse"
                    y1={this.windowParams.getBoxheight()}
                    x1="0"
                    y2="0"
                    x2="0"
                    id="placeNumberFinishPlaceFill"
                    xlinkHref="#placeNumberFinishPlaceGradient"
                />
            </defs>
            <g id="layerlane">
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
                    x={this.windowParams.getBoxNumberWidth() + this.windowParams.getLaneNumberTextFromLeft() + 3}
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




