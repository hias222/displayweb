import React from "react";
import { BaseFrontendInterface } from "../interfaces/BaseFrontendInterface";
import { HeaderEventHeatComponent } from "./HeaderEventHeatComponent";
import { SingleLaneStaticComponent } from "./SingleLaneStaticComponent";
import classNames from "classnames";
import LaneSeparator from "./svg/LaneSeparator";
import windowParameter from "../utilities/windowParameter";
import SingleLaneDisplay from "./lanes/SingleLaneDisplay";

export class SingleLaneFrontendComponent extends React.Component<BaseFrontendInterface, {}> {

    dynamictable = classNames('dynamic_base');
    windowParams: windowParameter;

    constructor(props: BaseFrontendInterface) {
        super(props)
        this.windowParams = new windowParameter();
    }

    componentDidUpdate(prevProps: BaseFrontendInterface) {
        if (prevProps.displayMode !== this.props.displayMode) {
            console.log("displayMode " + prevProps.displayMode + " " + this.props.displayMode + " ")
            
            this.resetClass();
            this.delay(200).then(() =>
                this.updateClass()
            )
            
        } else if (prevProps.lastUpdate !== this.props.lastUpdate) {
                this.updateClass()
        }
        // console.log(this.props)
    }

    delay(time: number) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    updateClass() {

        let container = document.getElementById('effectComponent');

        if (container != null) {

            if (container.className !== 'dynamic_effect') {
                this.dynamictable = classNames('dynamic_effect');
                container.className = this.dynamictable
                console.log('update ' + container.className)
                this.forceUpdate();
            }
        }

    }

    resetClass() {

        let container = document.getElementById('effectComponent');

        if (container != null) {

            if (container.className !== 'dynamic_base') {
                this.dynamictable = classNames('dynamic_base');
                container.className = this.dynamictable
                console.log('update ' + container.className)
                this.forceUpdate();
            }
        }

    }

    getheaderData() {
        return (
            <HeaderEventHeatComponent
                EventHeat={this.props.EventHeat}
                startdelayms={this.props.startdelayms}
                runningTime={this.props.runningTime}
                round={this.props.round}
            />
        )
    }

    checkShowOnlyHeader() {
        const b = this.props.lanes.filter((item) => item.finishtime !== 'undefined').shift()
        if (b === undefined) {
            //console.log('no times ------>')
            return true
        } else {
            //console.log('<------ time')
            return false
        }
    }

    getbodyData() {
        var laneNumber = parseInt(this.props.displayMode.slice(4)) - 1
        let noSpaceContainerVertical = classNames("noSpaceContainerVertical")
        var laneObject = Object.values(this.props.lanes)[laneNumber]
        if (laneObject !== undefined) {
            //console.log(laneObject)
            return (
                     //<div key={laneNumber + 250} className={noSpaceContainerVertical}>
                        <SingleLaneDisplay
                            key={laneNumber}
                            lane={laneObject.lane}
                            swimmer={laneObject.swimmerData}
                            entrytime={laneObject.entrytime}
                        />
                    //</div>
                )
        }
    }

    getOnlyOneData() {
        if (this.checkShowOnlyHeader()) {
            return (
                this.getheaderData()
            )
        }

        if (!this.checkShowOnlyHeader()) {
            return (
                this.getbodyData()
            )
        }
    }

    getAllData() {
        if (this.windowParams.getshowHeader()) {
            return (
                <div>
                    {this.getheaderData()}
                    {this.getbodyData()}
                </div>
            )
        }

        if (!this.windowParams.getshowHeader()) {
            return (
                this.getOnlyOneData()
            )
        }
    }

    render() {
        let noSpaceContainerVertical = classNames("noSpaceContainerVertical")
        return (
            <div id='effectComponent' className={this.dynamictable}>              
                    {this.getAllData()}
            </div>
        )
    }
}


//  <div key="500" className={noSpaceContainerVertical}>