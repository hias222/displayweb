import React from "react";
import { BaseFrontendInterface } from "../interfaces/BaseFrontendInterface";
import { HeaderEventHeatComponent } from "./HeaderEventHeatComponent";
import { SingleLaneStaticComponent } from "./SingleLaneStaticComponent";
import classNames from "classnames";
import LaneSeparator from "./svg/LaneSeparator";

export class BaseFrontendComponent extends React.Component<BaseFrontendInterface, {}> {

    dynamictable = classNames('dynamic_base');
    componentDidUpdate(prevProps: BaseFrontendInterface) {
        if (prevProps.EventHeat.heatnr !== this.props.EventHeat.heatnr || prevProps.EventHeat.eventnr !== this.props.EventHeat.eventnr) {
            console.log("diff heatnr " + prevProps.displayMode + " " + this.props.displayMode + " ")
            this.resetClass();
            this.delay(200).then(() =>
                this.updateClass()
            )
        }
        // console.log(this.props)

        if (prevProps.changeMode !== this.props.changeMode) {
            console.log("diff displayMode " + this.props.displayMode + " ")
            if (!this.props.changeMode) {
                //this.resetClass();
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

    render() {

        let noSpaceContainerVertical = classNames("noSpaceContainerVertical")

        return (
            <div id='effectComponent' className={this.dynamictable}>
                <div key="500" className={noSpaceContainerVertical}>
                    <HeaderEventHeatComponent
                        EventHeat={this.props.EventHeat}
                        startdelayms={this.props.startdelayms}
                        runningTime={this.props.runningTime}
                        round={this.props.round}
                    />
                    {
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
                    }
                </div >
            </div>
        )
    }
}
