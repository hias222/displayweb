import { Box } from '@mui/material';
import classNames from 'classnames';
import React from 'react';
import logo from './images/FCNLogo.png';
// 172 200
export default class LebkuchenLogo extends React.Component {
    render() {
        // 172*200
        let noSpaceContainerHorizontal = classNames("noSpaceContainerHorizontal")

        return (
            <div className={noSpaceContainerHorizontal}>
                <div>
                <Box width={3}></Box>
                </div>
            <img
                src={logo}
                alt=""
                width="86"
                height="100"
            />
            <div>
                <Box width={3}></Box>
            </div>
            </div>
        );
    }
} 