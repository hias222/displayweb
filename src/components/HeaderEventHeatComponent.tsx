import React from "react";
import { eventHeat } from "../types/EventHeat";
import classNames from "classnames";
import HeaderBoxName from "./svg/HeaderBoxName";

interface HeaderEventHeatInterface {
    EventHeat: eventHeat;
}

export class HeaderEventHeatComponent extends React.Component<HeaderEventHeatInterface, {}>{

    render() {
        let noSpaceContainerHorizontal = classNames("noSpaceContainerHorizontal")
        return (
            <div className={noSpaceContainerHorizontal}>
                <HeaderBoxName HeaderName={"Wettkampf:" + this.props.EventHeat.eventnr}
                    IsFirstText={true} />
                <HeaderBoxName HeaderName={"Lauf:" + this.props.EventHeat.heatnr}
                    IsFirstText={false} />
            </div>
        )
    }

}