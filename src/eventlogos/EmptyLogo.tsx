import { Box } from '@mui/material';
import classNames from 'classnames';
import React from 'react';
export default class EmptyLogo extends React.Component {
    render() {
        // 172*200
        let noSpaceContainerHorizontal = classNames("noSpaceContainerHorizontal")

        return (
            <div className={noSpaceContainerHorizontal}>
                <div>
                <Box width={5}></Box>
                </div>
            <div>
                <Box width={5}></Box>
            </div>
            </div>
        );
    }
} 