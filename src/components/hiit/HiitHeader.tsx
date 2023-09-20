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

export default function HiitHeader(model: { ticker: number, round: number }) {


    var gradient_name = classnames('messagetext_main');

    let length = windowParams.getPictureLength() ;
    let boxheight = windowParams.getBoxheight();

    let text = model.ticker + " " + model.round;

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
                    className={gradient_name}
                    d={boxSize}
                />
                {getLaneText(text)}
            </g>
        </svg>
        </div></div>
    );
}