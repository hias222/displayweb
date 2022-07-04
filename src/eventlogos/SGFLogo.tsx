import { Box } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import logo from './images/SGF.png';
export default class SGFLogo extends React.Component {
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
                width="80"
                height="80"
            />
            <div>
                <Box width={5}></Box>
            </div>
            </div>
        );
    }
} 