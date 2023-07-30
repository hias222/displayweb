import React from "react";
import { BaseFrontendInterface } from "../interfaces/BaseFrontendInterface";
import { HeaderEventHeatComponent } from "./HeaderEventHeatComponent";
import classNames from "classnames";
import LaneSeparator from "./svg/LaneSeparator";
import windowParameter from "../utilities/windowParameter";
import { LaneState } from "../state/LaneState";
import Best3LaneDisplay from "./lanes/Best3LaneDisplay";

export class Best3FrontendComponent extends React.Component<BaseFrontendInterface, {}> {

    dynamictable = classNames('dynamic_base');
    windowParams: windowParameter;

    constructor(props: BaseFrontendInterface) {
        super(props)
        this.windowParams = new windowParameter();
    }

    componentDidUpdate(prevProps: BaseFrontendInterface) {
        if (prevProps.EventHeat.heatnr !== this.props.EventHeat.heatnr || prevProps.EventHeat.eventnr !== this.props.EventHeat.eventnr) {
            console.log("diff heatnr " + prevProps.displayMode + " " + this.props.displayMode + " ")

            this.resetClass();
            this.delay(200).then(() =>
                this.updateClass()
            )

        } else if (this.props.changeMode) {
            if (prevProps.displayMode !== 'startlist') {
                this.updateClass()
            }
        }

        if (this.props.changeMode) {

            if (prevProps.displayMode !== 'race' && this.props.displayMode !== 'startlist') {
                this.updateClass()
            } else if (prevProps.displayMode === 'startlist') {
                this.delay(200).then(() =>
                    this.updateClass()
                )
            }
        }

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

    sortAndFilterBest3(lanes: LaneState[]) {

        let placeLower4: LaneState[] = lanes.filter((lane: LaneState, index) => (
            parseInt(lane.place) < 4
        ))

        let sort3Lanes: LaneState[] = placeLower4.sort((a, b) =>
            (parseInt(a.place) - parseInt(b.place))
        )

        return sort3Lanes
    }

    getbodyData() {
        let noSpaceContainerVertical = classNames("noSpaceContainerVertical")
        var best3lanes = this.sortAndFilterBest3(this.props.lanes)
        return (
            best3lanes.map((lane, index) => (
                <div key={index + 200} className={noSpaceContainerVertical}>
                    <Best3LaneDisplay
                            key={index}
                            lane={lane.lane}
                            swimmer={lane.swimmerData}
                            finishtime={lane.finishtime}
                            place={lane.place}
                        />
                    <LaneSeparator keyindex={index + 100} IsEnabled={true} />
                </div>
            ))
        )
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
                <div key="500" className={noSpaceContainerVertical}>
                    {this.getAllData()}
                </div >
            </div>
        )
    }
}
