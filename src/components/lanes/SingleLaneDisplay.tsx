import classNames from "classnames";
import React from "react";
import { LaneData } from "../../interfaces/lanedatainterface";
import windowParameter from "../../utilities/windowParameter";
import FullDisplayName from "../svg/FullDisplayName";

export default class SingleLaneDisplay extends React.Component<LaneData, {}> {

    windowParams: windowParameter;

    constructor(props: LaneData) {
        super(props)
        this.windowParams = new windowParameter();
    }

    checkName() {
        if (this.props.swimmer.name !== undefined) {
            let namelength = this.windowParams.getLengthNameStartlist() +10;

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
        } else {
            return ""
        }
    }

    checkClub() {
        if (this.props.swimmer.clubname !== undefined) {
            let namelength = this.windowParams.getLengthClubStartlist() +10;
            let sizeClub = this.props.swimmer.clubname.length;

            if (sizeClub > (namelength - 2)) {
                return this.props.swimmer.clubname.substr(0, (namelength - 2));
            }
            return this.props.swimmer.clubname
        } else {
            return ""
        }
    }

    formatEntryTime() {
        //console.log("- " + this.props.entrytime)
        return this.props.entrytime;
    }

    render() {
        let correctName = this.checkName();
        let noSpaceContainerHorizontal = classNames("noSpaceContainerHorizontal");
        let noFlexHorizontal = classNames("noFlexHorizontal")

        return <div className={noSpaceContainerHorizontal} >
            <div className={noFlexHorizontal}>
                <FullDisplayName
                    LaneName={correctName}
                    LaneNumber={this.props.lane.toString()}
                    IsOnlyBox={true}
                    AgeText={this.props.swimmer.birthyear !== undefined ? this.props.swimmer.birthyear : ""}
                    ClubName={this.checkClub()}
                    EntryTime={this.formatEntryTime()}
                />
            </div>
        </div >
    }
}
