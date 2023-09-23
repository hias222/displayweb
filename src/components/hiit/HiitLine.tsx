import React from "react"
import classnames from "classnames";
import windowParameter from "../../utilities/windowParameter";
import classNames from "classnames";
import { swimmerPosition } from "../../types/SwimmerPosition";
// model: {message: string}

var windowParams: windowParameter = new windowParameter()

function getLaneText(laneText: string) {
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


function getIntense(roundticker: number, varianz: number, order: number, intensity: number, departure: number): number {

    console.log(order + ":" + departure + "/" + intensity)

    if (roundticker >= (departure - 5)) {
        return 3
    } else if (roundticker >= intensity + varianz) {
        return 2
    } else if (roundticker >= intensity - varianz) {
        return 1
    }
    return 0

}

export default function HiitLine(model: { ticker: number, departure: number, gap: number, varianz: number, swimmerPos: swimmerPosition }) {



    let length = windowParams.getPictureLength();
    let boxheight = windowParams.getBoxheight();

    var round = Math.floor((model.ticker - ((model.swimmerPos.order - 1) * model.gap)) / model.departure)
    console.log(model.swimmerPos.order + ":" + round + " " + model.departure + "/" + model.swimmerPos.intensity)
    var roundTicker = model.ticker - (round * model.departure) - ((model.swimmerPos.order - 1) * model.gap)

    let intense = getIntense(roundTicker, model.varianz, model.swimmerPos.order, Number.parseFloat(model.swimmerPos.intensity), model.departure)
    let countdown = model.departure - roundTicker
    let abgang = countdown > 5 ? '' : countdown

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
                            className={getGradientName(intense)}
                            d={boxSize}
                        />
                        {getLeftText(model.swimmerPos.order.toString())}
                        {getLaneText(abgang.toString())}
                        {getEndText(roundTicker.toString())}
                    </g>
                </svg>
            </div></div>
    );
}