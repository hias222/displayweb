import React from "react"
import classnames from "classnames";
import windowParameter from "../../utilities/windowParameter";
import { swimmerPosition } from "../../types/SwimmerPosition";
import Grid from "@mui/material/Grid";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
// model: {message: string}

var windowParams: windowParameter = new windowParameter()

const theme = createTheme({
    palette: {
        background: {
            paper: '#062614',
            default: '#062614',
        },
        text: {
            primary: '#fff',
            secondary: '#46505A',
        },
        action: {
            active: '#001E3C',
        },
    },
    components: {
        MuiGrid: {
            styleOverrides: {
                root: {
                    backgroundColor: 'red',
                    fontSize: '44px',
                },
            },
        },
    },
});


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


function getIntense(ticker: number, order: number, varianz: number, gap: number, intensity: string, departure: number): number {

    var subTicker = getSubTicker(ticker,order, gap, departure);
    var numberIntensity =  Number.parseFloat(intensity)

    if (subTicker >= (departure - gap)) {
        return 4
    } else if (subTicker >= numberIntensity + varianz + 3) {
        return 3
    } else if (subTicker >= numberIntensity + varianz) {
        return 2
    } else if (subTicker >= numberIntensity - varianz) {
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

    var laneText = getLaneText(abgang.toString(), clearedLane)
    return laneText
}

function getGridFirstRow(order: number, intense: number) {

    return <Grid item xs={4} sx={{ color: 'text.primary', bgcolor: 'background.paper' }} >
        {order}
    </Grid>
}


export default function HiitGridLine(model: { ticker: number, round: string, departure: number, gap: number, varianz: number, swimmerPos: swimmerPosition[] }) {

    return (
        <ThemeProvider theme={theme}>
            <Grid container sx={{ bgcolor: 'background.paper' }}>
                <Grid item xs={4} sx={{ color: 'text.primary', bgcolor: 'background.paper' }}>
                    {model.departure}
                </Grid>
                <Grid item xs={4} sx={{ color: 'text.primary', bgcolor: 'background.paper' }}>
                    {model.round}
                </Grid>
                <Grid item xs={4} sx={{ color: 'text.primary', bgcolor: 'background.paper' }}>
                    {model.ticker}
                </Grid>
                {model.swimmerPos.filter(row => Number.parseFloat(row.intensity) > 0).map((row, index) => (
                    <>
                        {
                            getGridFirstRow(row.order, getIntense(model.ticker,row.order,model.varianz,model.gap,row.intensity,model.departure))}
                        <Grid item xs={4} sx={{ color: 'text.primary', bgcolor: 'background.paper' }}>
                            {getNameFieldCountDown(row.name, model.departure, getSubTicker(model.ticker, row.order, model.gap, model.departure), model.gap)}
                        </Grid><Grid item xs={4} sx={{ color: 'text.primary', bgcolor: 'background.paper' }}>
                            {getSubTicker(model.ticker, row.order, model.gap, model.departure)}
                        </Grid>
                    </>
                ))}
            </Grid>
        </ThemeProvider>
    );
}