import React from 'react';
import windowParameter from '../utilities/windowParameter';
import FCNLogo from './FCNLogo';
import SGMittelfranken from './SGMittelfranken';
import Swimmer from './Swimmer';

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

    }
}