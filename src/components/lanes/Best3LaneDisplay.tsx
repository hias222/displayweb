import classNames from "classnames";
import React from "react";
import { LaneData } from "../../interfaces/lanedatainterface";
import windowParameter from "../../utilities/windowParameter";
import Best3DisplayName from "../svg/Best3DisplayName";
import LaneTime from "../svg/LaneTime";
import getFinishTime from "../../utilities/getFinishTime";
import LaneMedalLarge from "../svg/LaneMedalLarge";

export default class Best3LaneDisplay extends React.Component<LaneData, {}> {

    windowParams: windowParameter;

    constructor(props: LaneData) {
        super(props)
        this.windowParams = new windowParameter();
    }

    checkName() {
        let namelength = this.windowParams.getLengthNameStartlist() + 5;

        let sizeName = this.props.swimmer.name.length;
        let sizeLastName = (this.props.swimmer.firstName !== undefined) ? this.props.swimmer.firstName.length : 0

        if (sizeName > (namelength - 2)) {
            //console.log("short name")
            return this.props.swimmer.name.substr(0, (namelength - 2));
        }

        if (sizeName + sizeLastName > namelength) {
            return this.props.swimmer.name + " " + this.props.swimmer.firstName?.substr(0, 1) + ".";
        }

        let name = this.props.swimmer.name + " " + this.props.swimmer.firstName
        return name
    }

    checkClub() {
        let namelength = this.windowParams.getLengthClubStartlist() + 5;
        let sizeClub = this.props.swimmer.clubname.length;

        if (sizeClub > (namelength - 2)) {
            return this.props.swimmer.clubname.substr(0, (namelength - 2));
        }
        return this.props.swimmer.clubname
    }


    render() {
        let correctName = this.checkName();
        let noSpaceContainerHorizontal = classNames("noSpaceContainerHorizontal");
        let noFlexHorizontal = classNames("noFlexHorizontal")

        return <div className={noSpaceContainerHorizontal} >
            <div className={noFlexHorizontal}>
                <LaneMedalLarge place={this.props.place !== undefined ? this.props.place : ""}
                />
                <Best3DisplayName
                    LaneName={correctName}
                    IsOnlyBox={false}
                    AgeText={this.props.swimmer.birthyear !== undefined ? this.props.swimmer.birthyear : ""}
                    ClubName={this.checkClub()}
                    FinishTime={this.props.finishtime}
                    Place={this.props.place}
                />
                <LaneTime
                    LaneTime={this.props.finishtime !== undefined ? getFinishTime(this.props.finishtime) : ""}
                />
            </div>
        </div >
    }
}
