import React from "react"
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

function getIntense(ticker: number, order: number, varianz: number, gap: number, intensity: string, departure: number): number {

    var subTicker = getSubTicker(ticker, order, gap, departure);
    var numberIntensity = Number.parseFloat(intensity)

    if (subTicker >= (departure - gap)) {
        return 5
    } else if (subTicker >= numberIntensity + varianz + 4) {
        return 4
    } else if (subTicker >= numberIntensity + varianz + 1) {
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

function getGridRow(ticker: number, order: number, gap: number, departure: number, varianz: number, intensity: string, name: string | undefined) {

    var intense = getIntense(ticker, order, varianz, gap, intensity, departure)
    var subTicker = getSubTicker(ticker, order, gap, departure)
    var countDown = getNameFieldCountDown(name, departure, subTicker, gap)


    switch (intense) {
        case 1:
            var background = '#006400' //gruen
            break;
        case 2:
            var background = '#FFA500' // orange
            break;
        case 3:
            var background = '#FF0000' // rot
            break;
        case 4:
            var background = 'background.default'
            break;
        case 5:
            var background = '#000080' // blau
            break;
        default:
            var background = 'background.default'
            break;
    }
    //var background = intense === 0 ? 'background.paper' : 'background.default'

    return <>
        <Grid item xs={4} sx={{ color: 'text.primary', bgcolor: background }} >
            {order}
        </Grid>
        <Grid item xs={4} sx={{ color: 'text.primary', bgcolor: background }} >
            {countDown}
        </Grid>
        <Grid item xs={4} sx={{ color: 'text.primary', bgcolor: background , textAlign: "end" }} >
            {subTicker}
        </Grid>
    </>
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
                <Grid item xs={4} sx={{ color: 'text.primary', bgcolor: 'background.paper' , textAlign: "end" }}>
                    {model.ticker}
                </Grid>
                {model.swimmerPos.filter(row => Number.parseFloat(row.intensity) > 0).map((row, index) => (
                    <>
                        {getGridRow(model.ticker, row.order, model.gap, model.departure, model.varianz, row.intensity, row.name)}
                    </>
                ))}
            </Grid>
        </ThemeProvider>
    );
}