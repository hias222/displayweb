import { Box } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import logo from './images/FCNLogo.png';
export default class FCNLogo extends React.Component {
    render() {
        // 172*200
        let noSpaceContainerHorizontal = classNames("noSpaceContainerHorizontal")

        return (
            <div className={noSpaceContainerHorizontal}>
                <div>
                <Box width={25}></Box>
                </div>
            <img
                src={logo}
                alt=""
                width="86"
                height="100"
            />
            <div>
                <Box width={36}></Box>
            </div>
            </div>
        );
    }
} 