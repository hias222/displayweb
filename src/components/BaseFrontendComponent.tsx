import React from "react";
import { BaseFrontendInterface } from "../interfaces/BaseFrontendInterface";
import { HeaderEventHeatComponent } from "./HeaderEventHeatComponent";
import { SingleLaneStaticComponent } from "./SingleLaneStaticComponent";
import classNames from "classnames";
import LaneSeparator from "./svg/LaneSeparator";

export class BaseFrontendComponent extends React.Component<BaseFrontendInterface, {}> {

    render() {

        let noSpaceContainerVertical = classNames("noSpaceContainerVertical")
        return (
            <div key="500" className={noSpaceContainerVertical}>

                <HeaderEventHeatComponent
                    EventHeat={this.props.EventHeat}
                    startdelayms={this.props.startdelayms}
                    runningTime={this.props.runningTime}
                />
                {
                    this.props.lanes.map((lane, index) => (
                        <div key={index + 200} className={noSpaceContainerVertical}>
                            <SingleLaneStaticComponent
                                key={index}
                                lane={lane}
                                index={index}
                                displayMode={this.props.displayMode}
                            />
                            <LaneSeparator keyindex={index + 100} IsEnabled={true} />
                        </div>
                    ))
                }

            </div >
        )
    }
}
