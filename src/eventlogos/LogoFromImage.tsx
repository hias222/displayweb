import React from 'react';
import logo from './images/logo.png';
export default class LogoFromImage extends React.Component {
    render() {
        return (
            <img
                src={logo}
                alt=""
                width="100"
                height="80"
            />
        );
    }
} 