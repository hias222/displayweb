import React from "react";
import classNames from "classnames";
import windowParameter from "../../utilities/windowParameter";
import { resultSwimmerData } from "../result/types/ResultSwimmerData";

export interface RankOtherData {
    swimmerResults: resultSwimmerData[];
}

export default class RankOthers extends React.Component<RankOtherData, {}> {

    windowParams: windowParameter;

    constructor(props: RankOtherData) {
        super(props)
        this.windowParams = new windowParameter();
    }

    getResultime(time: string | undefined) {
        var endTime = time !== undefined ? time : "NT"
        return endTime
    }

    getMarqueeString() {
        var marqueeText = '';
        this.props.swimmerResults.map((swimmer: resultSwimmerData, index) => (
            marqueeText = marqueeText + " " + swimmer.place + '. ' + swimmer.firstname + " " +  swimmer.lastname + " " + swimmer.name + "  - "
        ))
        return marqueeText
    }

    render() {

        let noSpaceContainerHorizontal = classNames("noSpaceContainerHorizontal");
        let noFlexHorizontal = classNames("noFlexHorizontal")
        let marquee = classNames('marquee')

        return <div className={noSpaceContainerHorizontal} >
            <div className={noFlexHorizontal} >
                <div id="marquee" className={marquee}><span>
                    {this.getMarqueeString()}
                </span></div>
            </div>

        </div>;

    }
}
