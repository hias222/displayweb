import React from "react";
import { eventHeat } from "../types/EventHeat";
import classNames from "classnames";
import HeaderBoxName from "./svg/HeaderBoxName";
import TopEventNameHeader from "./svg/TopEventNameHeader";
import { StartStopComponent } from "./StartStopComponent";
import SwimmerLogo from "../eventlogos/SwimmerLogo";
import windowParameter from "../utilities/windowParameter";
import getSwimStyle from "../utilities/getSwimStyles";

interface HeaderEventHeatInterface {
    EventHeat: eventHeat;
    startdelayms: number;
    runningTime: string;
    round: number;
}

export class HeaderEventHeatComponent extends React.Component<HeaderEventHeatInterface, {}> {

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
                    <div >
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

        } else if (this.windowParams.getSeparateSmallWindow()) {
            //console.log('SeparateSmallWindow')
            var distance = this.props.EventHeat.distance !== undefined ? this.props.EventHeat.distance + "m" : ""
            var style = this.props.EventHeat.swimstyle !== undefined ? getSwimStyle(this.props.EventHeat.swimstyle) : ""
            return (<div>
                <StartStopComponent
                    startdelayms={this.props.startdelayms}
                    EventHeat={this.props.EventHeat}
                    runningTime={this.props.runningTime}
                    round={this.props.round}
                />
                <HeaderBoxName HeaderName={distance}
                    IsFirstText={true}
                    Parts={1} />
                <HeaderBoxName HeaderName={style}
                    IsFirstText={true}
                    Parts={1} />
            </div>)
        } else if (this.windowParams.getOnlyLaneAndPlace() || this.windowParams.getDetailedheaderoneline()) {
            //console.log('getOnlyLaneAndPlace')
            return (<div>
                <StartStopComponent
                    startdelayms={this.props.startdelayms}
                    EventHeat={this.props.EventHeat}
                    runningTime={this.props.runningTime}
                    round={this.props.round}
                />
            </div>)
        } else {
            //console.log('esle ')
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
        return this.getShow()
    }

}