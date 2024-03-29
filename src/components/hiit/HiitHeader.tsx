import React from "react"
import classnames from "classnames";
import windowParameter from "../../utilities/windowParameter";
import classNames from "classnames";
// model: {message: string}

var windowParams: windowParameter = new windowParameter()

function getLeftText(laneText: string) {
    let textplacesvg = classnames('texthiitsvg');
    return <text
        className={textplacesvg}
        y={windowParams.getboxHeaderTextfromtop()}
        x={0}
    >
        {laneText}</text>

}

function getRoundText(laneText: string) {
    let texthiitround = classnames('texthiitround');
    return <text
        className={texthiitround}
        y={windowParams.getboxHeaderTextfromtop()}
        x={windowParams.getPictureLength() / 2}
        textAnchor="middle"
    >
        {laneText}</text>

}

function getTimeText(laneText: string) {
    let textplacesvg = classnames('texthiitsvg');
    return <text
        className={textplacesvg}
        y={windowParams.getboxHeaderTextfromtop()}
        x={windowParams.getPictureLength() - 0}
        textAnchor="end"
    >
        {laneText}</text>

}

export default function HiitHeader(model: { departure: string, ticker: string, round: string }) {

    var texthiitsvg = classnames('textbacksvg');

    let length = windowParams.getPictureLength() ;
    let boxheight = windowParams.getTopRowHeight();

    let viewBoxSize = "0 0 " + length + " " + windowParams.getTopRowHeight()
    let boxSize = "M 0 0 h " + length + " v " + boxheight + " h -" + (length + 30) + " z"

    let noSpaceContainerHorizontal = classNames("noSpaceContainerHorizontal");
    let noFlexHorizontal = classNames("noFlexHorizontal")

    return (

        <div className={noSpaceContainerHorizontal} >
        <div className={noFlexHorizontal}>

        <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMaxYMax meet"
            id="svg8"
            version="1.1"
            viewBox={viewBoxSize}
            height={windowParams.getTopRowHeight()}
        >
            <g id="LaneName1">
                <path
                    transform="scale(1)"
                    className={texthiitsvg}
                    d={boxSize}
                />
                {getLeftText(model.departure)}
                {getRoundText(model.round)}
                {getTimeText(model.ticker)}
            </g>
        </svg>
        </div></div>
    );
}