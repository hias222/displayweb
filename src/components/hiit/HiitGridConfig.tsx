import React from "react"
import { swimmerPosition } from "../../types/SwimmerPosition";
import Grid from "@mui/material/Grid";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
// model: {message: string}

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

export default function HiitGridConfig(model: { ticker: number, round: string, departure: number, gap: number, varianz: number, swimmerPos: swimmerPosition[] }) {

    return (
        <ThemeProvider theme={theme}>
            <Grid container>
                <Grid item xs={4} sx={{ color: 'text.primary', bgcolor: 'background.paper' }}>
                    {model.departure}
                </Grid>
                <Grid item xs={4} sx={{ color: 'text.primary', bgcolor: 'background.paper' }}>
                    {model.round}
                </Grid>
                <Grid item xs={4} sx={{ color: 'text.primary', bgcolor: 'background.paper', textAlign: "end" }}>
                    {model.ticker}
                </Grid>
                {model.swimmerPos.filter(row => Number.parseFloat(row.intensity) > 0).map((row, index) => (
                    <>
                        <Grid item xs={4} sx={{ color: 'text.primary', bgcolor: 'background.paper' }} >
                            {row.order}
                        </Grid><Grid item xs={4} sx={{ color: 'text.primary', bgcolor: 'background.paper' }}>
                            {row.name}
                        </Grid><Grid item xs={4} sx={{ color: 'text.primary', bgcolor: 'background.paper' , textAlign: "end"}}>
                            {row.intensity}
                        </Grid>
                    </>
                ))}
            </Grid>
        </ThemeProvider>
    );
}