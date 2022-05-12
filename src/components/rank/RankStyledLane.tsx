import React from "react";
import classNames from "classnames";
import windowParameter from "../../utilities/windowParameter";
import RankName from "./svg/RankName";
import RankNumber from "./svg/RankNumber";
import { resultSwimmerData } from "../result/types/ResultSwimmerData";
import RankTime from "./svg/RankTime";


export interface RankData {
    swimmer: resultSwimmerData;
}

export default class RankStyledLane extends React.Component<RankData, {}> {

    windowParams: windowParameter;

    constructor(props: RankData) {
        super(props)
        this.windowParams = new windowParameter();
    }

    getResultime(time: string | undefined) {
        var endTime = time !== undefined ? time : "NT"
        return endTime
    }

    render() {

        let noSpaceContainerHorizontal = classNames("noSpaceContainerHorizontal");
        let noFlexHorizontal = classNames("noFlexHorizontal")
        
        return <div className={noSpaceContainerHorizontal} >
            <div className={noFlexHorizontal} >
                <RankNumber laneNumber={this.props.swimmer.place} />
                <RankName
                    Name={this.props.swimmer.firstname + ' ' + this.props.swimmer.lastname}
                    Birthdate={this.props.swimmer.birthdate + ' '}
                    Club={this.props.swimmer.name}
                    IsOnlyBox={false}
                />          
                <RankTime Time={this.getResultime(this.props.swimmer.swimtime)} IsOnlyBox={false} />
            </div>
        </div>;

    }
}
