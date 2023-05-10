import { Box } from '@mui/material';
import classNames from 'classnames';
import React from 'react';
import logo from './images/logo_scs_url.png';
import windowParameter from '../utilities/windowParameter';
export default class SADLogo extends React.Component {
    windowParams: windowParameter;

    constructor(props: {}) {
        super(props)
        this.windowParams = new windowParameter();
    }

    render() {
        // 172*200
        let noSpaceContainerHorizontal = classNames("noSpaceContainerHorizontal")

        return (
            <div className={noSpaceContainerHorizontal}>
                <div>
                    <Box width={5}></Box>
                </div>
                <img
                    src={logo}
                    alt=""
                    width={this.windowParams.getLogoSpace() - 10}
                    height="80"
                />
                <div>
                    <Box width={5}></Box>
                </div>
            </div>
        );
    }
} 