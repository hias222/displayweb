import classNames from "classnames";
import React from "react";
import { LaneData } from "../../interfaces/lanedatainterface";
import LaneName from "../svg/LaneName";

import LaneNumber from "../svg/LaneNumber";

export default class StyledLane extends React.Component<LaneData, {}> {

    box_height: number;

    constructor(props: LaneData) {
        super(props)
        this.box_height = process.env.REACT_APP_BOX_HEIGHT !== undefined ? Number(process.env.REACT_APP_BOX_HEIGHT) : 50
    }

    checkName() {
        let namelength = 20;

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

    formatEntryTime() {
        console.log("- " + this.props.entrytime)
        return this.props.entrytime;
    }

    render() {
        let correctName = this.checkName() + " (" + this.props.swimmer.birthyear + ")";
        let noSpaceContainerHorizontal = classNames("noSpaceContainerHorizontal");
        let noFlexHorizontal = classNames("noFlexHorizontal")

        return <div className={noSpaceContainerHorizontal} >
            <div className={noFlexHorizontal}>
                <LaneNumber
                    laneNumber={this.props.lane} />
                <LaneName
                    LaneName={correctName}
                    IsOnlyBox={true}
                    />
            </div>
        </div >

    }
}
