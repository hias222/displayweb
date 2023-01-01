import React from "react";
import windowParameter from "../../utilities/windowParameter";
import { Box } from "@mui/material";


export default class RankBox extends React.Component<{}, {}> {

    windowParams: windowParameter;

    constructor(props: {}) {
        super(props)
        this.windowParams = new windowParameter();
    }

    render() {
        let height = this.windowParams.getTopRowHeight()
        return <Box height={height}></Box>
    }
}
