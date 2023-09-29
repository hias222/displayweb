import React from "react"
import { swimmerPosition } from "../../types/SwimmerPosition";
import Grid from "@mui/material/Grid";
// model: {message: string}


export default function HiitGridConfig(model: { ticker: number, round: string, departure: number, gap: number, varianz: number, swimmerPos: swimmerPosition[] }) {

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
                        {row.name}
                    </Grid><Grid item xs={4}>
                        {row.intensity}
                    </Grid>
                </>
            ))}
        </Grid>

    );
}