import React from "react"
import classnames from "classnames";
import windowParameter from "../../utilities/windowParameter";
import classNames from "classnames";
import { swimmerPosition } from "../../types/SwimmerPosition";
import Grid from "@mui/material/Grid";
// model: {message: string}

var windowParams: windowParameter = new windowParameter()

function getLaneText(laneText: string, swimmerName: string | undefined) {

    if (windowParams.getshowNameInHiit()) {

        if (laneText !== '') {
            return laneText
        } else {
            return swimmerName
        }
    } else {
        return laneText
    }

}

function getGradientName(intensity: number) {

    var gradient_name_1 = classnames('gradient_intense_1');
    var gradient_name_0 = classnames('gradient_intense_0');
    var gradient_name_2 = classnames('gradient_intense_2');
    var gradient_name_3 = classnames('gradient_intense_3');
    var gradient_name_4 = classnames('gradient_intense_4');

    if (intensity === 0) {
        return gradient_name_0
    } else if (intensity === 1) {
        return gradient_name_1
    } else if (intensity === 2) {
        return gradient_name_2
    } else if (intensity === 3) {
        return gradient_name_3
    } else if (intensity === 4) {
        return gradient_name_4
    }
    else {
        return gradient_name_0
    }

}


function getIntense(roundticker: number, varianz: number, gap: number, intensity: number, departure: number): number {
    if (roundticker >= (departure - gap)) {
        return 4
    } else if (roundticker >= intensity + varianz + 3) {
        return 3
    } else if (roundticker >= intensity + varianz) {
        return 2
    } else if (roundticker >= intensity - varianz) {
        return 1
    }
    return 0

}

function getSubTicker(ticker: number, order: number, gap: number, departure: number): number {

    var round = Math.floor((ticker - ((order - 1) * gap)) / departure)
    var roundTicker = ticker - (round * departure) - ((order - 1) * gap)

    return roundTicker
}

function getNameFieldCountDown(name: string | undefined, departure: number, roundTicker: number, gap: number): string | undefined {

    let countdown = departure - roundTicker
    let abgang = countdown > gap ? '' : countdown

    var clearedLane = name === undefined ? '' : name

    var laneText = getLaneText(abgang.toString(),clearedLane)
    return laneText
}

export default function HiitGridLine(model: { ticker: number, round: string, departure: number, gap: number, varianz: number, swimmerPos: swimmerPosition[] }) {

    return (
        <Grid container>
            <Grid item xs={4}>
                {model.departure}
            </Grid>
            <Grid item xs={4}>
                {model.round}
            </Grid>
            <Grid item xs={4}>
                {model.ticker}
            </Grid>
            {model.swimmerPos.filter(row => Number.parseFloat(row.intensity) > 0).map((row, index) => (
                <>
                    <Grid item xs={4}>
                        {row.order}
                    </Grid><Grid item xs={4}>
                        {getNameFieldCountDown(row.name, model.departure, getSubTicker(model.ticker, row.order, model.gap, model.departure), model.gap)}
                    </Grid><Grid item xs={4}>
                        {getSubTicker(model.ticker, row.order, model.gap, model.departure)}
                    </Grid>
                </>
            ))}
        </Grid>

    );
}