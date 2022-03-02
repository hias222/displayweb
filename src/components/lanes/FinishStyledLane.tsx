import React from "react";
import { LaneData } from "../../interfaces/lanedatainterface";
import LaneNumberFinish from "../svg/LaneNumberFinish";
import classNames from "classnames";
import LaneName from "../svg/LaneName";
import LaneTime from "../svg/LaneTime";
import windowParameter from "../../utilities/windowParameter";
export default class FinishStyledLane extends React.Component<LaneData, {}> {

    windowParams: windowParameter;

    constructor(props: LaneData) {
        super(props)
        this.windowParams = new windowParameter();
    }

    checkName() {
        let namelength = this.windowParams.getLengthNameFinishlist();

        let sizeName = this.props.swimmer.name.length;
        let sizeLastName = (this.props.swimmer.firstName !== undefined) ? this.props.swimmer.firstName.length : 0

        if (sizeName > (namelength - 2)) {
            console.log("short name")
            return this.props.swimmer.name.substr(0, (namelength - 2));
        }

        if (sizeName + sizeLastName > namelength) {
            return this.props.swimmer.name + " " + this.props.swimmer.firstName?.substr(0, 1) + ".";
        }

        let name = this.props.swimmer.name + " " + this.props.swimmer.firstName

        return name
    }

    render() {

        let correctName = this.checkName();
        let finishtime = this.props.finishtime === undefined ? "" : this.props.finishtime

        let noSpaceContainerHorizontal = classNames("noSpaceContainerHorizontal");
        let noFlexHorizontal = classNames("noFlexHorizontal")

        return <div className={noSpaceContainerHorizontal} >
            <div className={noFlexHorizontal} >
                <LaneNumberFinish
                    laneNumber={this.props.lane}
                    place={this.props.place}
                />
                <LaneName
                    LaneName={correctName}
                    IsOnlyBox={false}
                    AgeText={this.props.swimmer.birthyear !== undefined ? this.props.swimmer.birthyear : ""}
                    ClubName={this.props.swimmer.clubname}
                />
                <LaneTime LaneTime={finishtime}
                />
            </div>
        </div>;

    }
}