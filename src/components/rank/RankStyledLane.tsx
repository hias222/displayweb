import React from "react";
import classNames from "classnames";
import windowParameter from "../../utilities/windowParameter";
import RankName from "./svg/RankName";


export interface RankData {
    place: string;
    finishtime?: string;
    swimmer: string;
}

export default class RankStyledLane extends React.Component<RankData, {}> {

    windowParams: windowParameter;

    constructor(props: RankData) {
        super(props)
        this.windowParams = new windowParameter();
    }

    render() {

        let noSpaceContainerHorizontal = classNames("noSpaceContainerHorizontal");
        let noFlexHorizontal = classNames("noFlexHorizontal")

        return <div className={noSpaceContainerHorizontal} >
            <div className={noFlexHorizontal} >
    
                <RankName
                    Name={this.props.swimmer}
                    IsOnlyBox={false}
                />

            </div>
        </div>;

    }
}
