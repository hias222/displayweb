import React from "react";
import { StartStopComponent } from "./StartStopComponent";
import { BaseFrontendInterface } from "../interfaces/BaseFrontendInterface";
import { HeaderEventHeatComponent } from "./HeaderEventHeatComponent";
import { SingleLaneStaticComponent } from "./SingleLaneStaticComponent";
import TopEventNameHeader from "./svg/TopEventNameHeader";
import classNames from "classnames";
import LaneSeparator from "./svg/LaneSeparator";

export class BaseFrontendStaticComponent extends React.Component<BaseFrontendInterface, {}> {

    componentDidUpdate(prevProps: BaseFrontendInterface) {

        if (prevProps.lanes !== this.props.lanes) {
            console.log("update BaseFrontendStaticComponent lanes")
            //console.log("update " + JSON.stringify(this.props.lanes))
        }
    }

    render() {

        let EventName = this.props.EventHeat.competition === undefined ? "" : this.props.EventHeat.competition

        let noSpaceContainerVertical = classNames("noSpaceContainerVertical")


        return (
            <div className={noSpaceContainerVertical}>

                <TopEventNameHeader EventName={EventName} />

                <HeaderEventHeatComponent
                    EventHeat={this.props.EventHeat}
                />

                <StartStopComponent
                    startdelayms={this.props.startdelayms}
                    EventHeat={this.props.EventHeat}
                    runningTime={this.props.runningTime}
                />

                {
                    this.props.lanes.map((lane, index) => (
                        <div className={noSpaceContainerVertical}>
                            <LaneSeparator IsEnabled={true} />
                            <SingleLaneStaticComponent
                                key={index}
                                lane={lane}
                                index={index}
                                displayMode={this.props.displayMode}
                            />
                        </div>
                    ))
                }

            </div >
        )
    }
}
