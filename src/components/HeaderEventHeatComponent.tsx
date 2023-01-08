import React from "react";
import { eventHeat } from "../types/EventHeat";
import classNames from "classnames";
import HeaderBoxName from "./svg/HeaderBoxName";
import TopEventNameHeader from "./svg/TopEventNameHeader";
import { StartStopComponent } from "./StartStopComponent";
import SwimmerLogo from "../eventlogos/LebkuchenLogo";
import windowParameter from "../utilities/windowParameter";

interface HeaderEventHeatInterface {
    EventHeat: eventHeat;
    startdelayms: number;
    runningTime: string;
    round: number;
}

export class HeaderEventHeatComponent extends React.Component<HeaderEventHeatInterface, {}>{

    windowParams: windowParameter;

    constructor(props: HeaderEventHeatInterface) {
        super(props)
        this.windowParams = new windowParameter();
    }

    getShow() {

        let noSpaceContainerHorizontal = classNames("noSpaceContainerHorizontal")
        let noSpaceContainerVertical = classNames("noSpaceContainerVertical")

        let EventName = this.props.EventHeat.competition === undefined ? "" : this.props.EventHeat.competition

        if (this.windowParams.getDetailsInHeader()) {

            return (
                <div className={noSpaceContainerHorizontal}>
                    <div>
                        <SwimmerLogo />
                    </div>
                    <div className={noSpaceContainerVertical}>
                        <TopEventNameHeader EventName={EventName} />

                        <HeaderBoxName HeaderName={this.props.EventHeat.name}
                            IsFirstText={true}
                            Parts={1} />

                        <div className={noSpaceContainerHorizontal}>
                            <StartStopComponent
                                startdelayms={this.props.startdelayms}
                                EventHeat={this.props.EventHeat}
                                runningTime={this.props.runningTime}
                                round={this.props.round}
                            />
                        </div>
                    </div >
                </div>
            )

        } else {

            return (
                <div className={noSpaceContainerHorizontal}>
                    <div className={noSpaceContainerVertical}>

                        <HeaderBoxName HeaderName={this.props.EventHeat.name}
                            IsFirstText={true}
                            Parts={1} />

                        <StartStopComponent
                            startdelayms={this.props.startdelayms}
                            EventHeat={this.props.EventHeat}
                            runningTime={this.props.runningTime}
                            round={this.props.round}
                        />
                    </div >
                </div>
            )
        }

    }

    render() {
        //  let noSpaceContainerHorizontal = classNames("noSpaceContainerHorizontal")
        //  let noSpaceContainerVertical = classNames("noSpaceContainerVertical")

        //let EventName = this.props.EventHeat.competition === undefined ? "" : this.props.EventHeat.competition

        // <SwimmerLogo />
        //  <LogoFromImage />

        return this.getShow()
    }

}