import React from "react";
import { BaseFrontendInterface } from "../interfaces/BaseFrontendInterface";
import { HeaderEventHeatComponent } from "./HeaderEventHeatComponent";
import { SingleLaneStaticComponent } from "./SingleLaneStaticComponent";
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

        let noSpaceContainerVertical = classNames("noSpaceContainerVertical")
        return (
            <div className={noSpaceContainerVertical}>

                <HeaderEventHeatComponent
                    EventHeat={this.props.EventHeat}
                    startdelayms={this.props.startdelayms}
                    runningTime={this.props.runningTime}
                />

                {
                    this.props.lanes.map((lane, index) => (
                        <div className={noSpaceContainerVertical}>
                            <SingleLaneStaticComponent
                                key={index}
                                lane={lane}
                                index={index}
                                displayMode={this.props.displayMode}
                            />
                            <LaneSeparator IsEnabled={true} />
                        </div>
                    ))
                }

            </div >
        )
    }
}
