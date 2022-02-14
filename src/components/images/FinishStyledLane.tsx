import React from "react";
import { LaneData } from "../../interfaces/lanedatainterface";
import LaneNumberFinish from "../svg/LaneNumberFinish";
import classNames from "classnames";
import LaneName from "../svg/LaneName";
import LaneTime from "../svg/LaneTime";
export default class FinishStyledLane extends React.Component<LaneData, {}> {

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
            </div>
            <div className={noFlexHorizontal} >
                <LaneName
                    LaneName={correctName}
                    laneStartPoint={100}
                    laneEndSpace={100} />
            </div>
            <div className={noFlexHorizontal} >
                <LaneTime LaneTime={finishtime} laneStartPoint={400}
                />
            </div>
        </div>;

    }
}
