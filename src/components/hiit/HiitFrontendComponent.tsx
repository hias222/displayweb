import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import classnames from "classnames";
import { HiitState } from "../../state/HiitState";

export type HiitType = {
    slow: string;
    shigh: string;
}

export interface HiitInterface {
    HiitState: HiitState;
}

export class HiitFrontendComponent extends React.Component<HiitInterface, HiitType> {


    constructor(props: HiitInterface) {
        super(props)

        this.state = {
            slow: '10',
            shigh: '30'
        }
    }

    componentDidUpdate(prevProps: HiitInterface) {

        if (prevProps !== this.props) {
            
            if (this.props.HiitState.event === 'config') {
                console.log('config')
                this.setState({ slow: this.props.HiitState.slow })
                this.setState({ shigh: this.props.HiitState.shigh })
            }

            if (this.props.HiitState.event === 'start') {
                console.log('start')    
            }

            if (this.props.HiitState.event === 'stop') {
                console.log('stop')    
            }
        }
    }

    render() {
        let messagetext_main = classnames('messagetext_main');
        return (
            <Grid item  >
                <Typography className={messagetext_main}>
                    Mode HIIT
                    <br></br>
                    {this.state.shigh}
                    <br></br>
                    {this.state.slow}
                </Typography>
            </Grid>
        )
    }
}
