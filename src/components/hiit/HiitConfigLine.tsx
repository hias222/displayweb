import React from "react"
import classnames from "classnames";
import windowParameter from "../../utilities/windowParameter";
import classNames from "classnames";
import { swimmerPosition } from "../../types/SwimmerPosition";
// model: {message: string}

var windowParams: windowParameter = new windowParameter()

function getLaneText(laneText: string | undefined) {
    let textplacesvg = classnames('textplacesvg');
    return <text
        className={textplacesvg}
        y={windowParams.getBoxTextFromTop()}
        x={windowParams.getPictureLength() / 2}
        textAnchor="middle"
    >
        {laneText}</text>

}

function getLeftText(laneText: string) {
    let textplacesvg = classnames('textplacesvg');
    return <text
        className={textplacesvg}
        y={windowParams.getBoxTextFromTop()}
        x={0}
        textAnchor="start"
    >
        {laneText}</text>

}

function getGradientName(intensity: number) {

    var gradient_name_1 = classnames('gradient_intense_1');
    var gradient_name_0 = classnames('gradient_intense_0');
    var gradient_name_2 = classnames('gradient_intense_2');
    var gradient_name_3 = classnames('gradient_intense_3');

    if (intensity === 0) {
        return gradient_name_0
    } else if (intensity === 1) {
        return gradient_name_1
    } else if (intensity === 2) {
        return gradient_name_2
    } else if (intensity === 3) {
        return gradient_name_3
    }
    else {
        return gradient_name_0
    }

}

function getEndText(laneText: string) {
    let textplacesvg = classnames('textplacesvg');
    return <text
        className={textplacesvg}
        y={windowParams.getBoxTextFromTop()}
        x={windowParams.getPictureLength()}
        textAnchor="end"
    >
        {laneText}</text>

}

export default function HiitConfigLine(model: { ticker: number, departure: number, gap: number, varianz: number, swimmerPos: swimmerPosition }) {

    let length = windowParams.getPictureLength();
    let boxheight = windowParams.getBoxheight();
   
    let viewBoxSize = "0 0 " + length + " " + windowParams.getBoxheight()
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
                    height={windowParams.getBoxheight()}
                >
                    <g id="LaneName1">
                        <path
                            transform="scale(1)"
                            className={getGradientName(0)}
                            d={boxSize}
                        />
                        {getLeftText(model.swimmerPos.order.toString())}
                        {getLaneText(model.swimmerPos.name)}
                        {getEndText(model.swimmerPos.intensity.toString())}
                    </g>
                </svg>
            </div></div>
    );
}