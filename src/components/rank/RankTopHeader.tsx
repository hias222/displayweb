import React from "react";
import classNames from "classnames";
import windowParameter from "../../utilities/windowParameter";
import SwimmerLogo from "../../eventlogos/SwimmerLogo";
import TopEventNameHeader from "../svg/TopEventNameHeader";
import { eventDefinition } from "../result/types/eventDefinition";


export interface RankEvent {
    eventDefinition: eventDefinition;
}

export default class RankTopHeader extends React.Component<RankEvent, {}> {

    windowParams: windowParameter;

    constructor(props: RankEvent) {
        super(props)
        this.windowParams = new windowParameter();
    }

    render() {
        
        let noSpaceContainerHorizontal = classNames("noSpaceContainerHorizontal");
        //let noFlexHorizontal = classNames("noFlexHorizontal")

        return <div className={noSpaceContainerHorizontal}>
            <div>
                <SwimmerLogo />
            </div>
            <div>
                <TopEventNameHeader EventName={this.props.eventDefinition.competition} />
                <TopEventNameHeader EventName={this.props.eventDefinition.name} />
                <TopEventNameHeader EventName={this.props.eventDefinition.age} />
            </div>
        </div>

    }
}
