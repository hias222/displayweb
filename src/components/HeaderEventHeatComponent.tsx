import React from "react";
import { eventHeat } from "../types/EventHeat";
import classNames from "classnames";
import HeaderBoxName from "./svg/HeaderBoxName";
import TopEventNameHeader from "./svg/TopEventNameHeader";
import { StartStopComponent } from "./StartStopComponent";
import LogoFromImage from "../eventlogos/LogoFromImage";

interface HeaderEventHeatInterface {
    EventHeat: eventHeat;
    startdelayms: number;
    runningTime: string;
}

export class HeaderEventHeatComponent extends React.Component<HeaderEventHeatInterface, {}>{

    render() {
        let noSpaceContainerHorizontal = classNames("noSpaceContainerHorizontal")
        let noSpaceContainerVertical = classNames("noSpaceContainerVertical")

        let EventName = this.props.EventHeat.competition === undefined ? "" : this.props.EventHeat.competition

        // <SwimmerLogo />

        return (
            <div className={noSpaceContainerHorizontal}>
                <div>
                    <LogoFromImage />
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
                        />
                    </div>
                </div >
            </div>
        )
    }

}