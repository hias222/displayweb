import React from "react";
import { BaseFrontendInterface } from "../interfaces/BaseFrontendInterface";
import { HeaderEventHeatComponent } from "./HeaderEventHeatComponent";
import { SingleLaneStaticComponent } from "./SingleLaneStaticComponent";
import classNames from "classnames";
import LaneSeparator from "./svg/LaneSeparator";
import windowParameter from "../utilities/windowParameter";

export class BaseFrontendComponent extends React.Component<BaseFrontendInterface, {}> {

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

        //console.log("changemode  " + this.props.changeMode + " new " + this.props.displayMode + " ")

        /*
        if (prevProps.changeMode !== this.props.changeMode) {
            console.log("diff displayMode " + this.props.displayMode + " ")
            if (!this.props.changeMode) {
                
                //this.resetClass();
                this.delay(200).then(() =>
                    this.updateClass()
                )

            }
        }
        */
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
        const b = this.props.lanes.filter((item) => item.islaptime !== false ).shift()
        const c = this.props.lanes.filter((item) => item.finishtime !== 'undefined').shift()

        //const c =  'hello'
        //const b =  'hello'
        
        if (b === undefined || c === undefined) {
            //console.log('no times ------>')
            return true
        } else {
            //console.log('<------ time')
            return false
        }
    }

    getbodyData() {
        // console.log('---> getbodyData <----')

        let noSpaceContainerVertical = classNames("noSpaceContainerVertical")
        return (
            this.props.lanes.map((lane, index) => (
                <div key={index + 200} className={noSpaceContainerVertical}>
                    <SingleLaneStaticComponent
                        key={index}
                        lane={lane}
                        index={index}
                        displayMode={this.props.displayMode}
                    />
                    <LaneSeparator keyindex={index + 100} IsEnabled={true} />
                </div>
            ))
        )
    }

    getbodyDataColumns(firstLane: number, lastlane: number) {
        let noSpaceContainerVertical = classNames("noSpaceContainerVertical")
        let firstlanes = this.props.lanes.filter(lane => parseInt(lane.lane) <= lastlane)
        let filterlanes = firstlanes.filter(lane => parseInt(lane.lane) >= firstLane)
        return (
            filterlanes.map((lane, index) => (
                <div key={index + 200} className={noSpaceContainerVertical}>
                    <SingleLaneStaticComponent
                        key={index}
                        lane={lane}
                        index={index}
                        displayMode={this.props.displayMode}
                    />
                    <LaneSeparator keyindex={index + 100} IsEnabled={true} />
                </div>
            )))
    }

    getbodyData2Columns() {
        let noSpaceContainerHorizontal = classNames("noSpaceContainerHorizontal")
        let noSpaceContainerVertical = classNames("noSpaceContainerVertical")
        return (
            <div key={181} className={noSpaceContainerHorizontal}>
                <div key={182} className={noSpaceContainerVertical}>
                    {this.getbodyDataColumns(1,4)}
                </div>
                <div key={183} className={noSpaceContainerVertical}>
                    {this.getbodyDataColumns(5,8)}
                </div>
            </div>
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

        if (this.windowParams.getLanestwocolumns()) {
            return (
                <div>
                    {this.getheaderData()}
                    {this.getbodyData2Columns()}
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
