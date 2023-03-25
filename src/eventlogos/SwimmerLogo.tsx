import React from 'react';
import windowParameter from '../utilities/windowParameter';
import FCNLogo from './FCNLogo';
import SGFLogo from './SGFLogo';
import SGMittelfranken from './SGMittelfranken';
import Swimmer from './Swimmer';
import LebkuchenLogo from './LebkuchenLogo';

// https://www.svgrepo.com/svg/39643/swimming

export default class SwimmerLogo extends React.Component<{}, {}> {

    windowParams: windowParameter;
    constructor(props: {}) {
        super(props)
        this.windowParams = new windowParameter();
    }

    render() {

        if (this.windowParams.getLogoNumber() === 0) {
            return <Swimmer></Swimmer>
        }

        if (this.windowParams.getLogoNumber() === 1) {
            return <SGMittelfranken />
        }

        if (this.windowParams.getLogoNumber() === 2) {
            return <FCNLogo />
        }

        if (this.windowParams.getLogoNumber() === 3) {
            return <LebkuchenLogo />
        }

        if (this.windowParams.getLogoNumber() === 5) {
            return <SGFLogo />
        }

    }
}