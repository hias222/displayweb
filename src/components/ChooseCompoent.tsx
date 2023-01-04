import React from "react";
import { ChooseInterface } from "../interfaces/ChooseInterface";
import { BaseFrontendComponent } from "./BaseFrontendComponent";
import { MessageFrontendComponent } from "./messages/MessageFrontendComponent";
import { ResultFrontendComponent } from "./result/ResultFrontendComponent";

export class ChooseComponent extends React.Component<ChooseInterface, {}> {


    getDisplayData() {


        if (this.props.displayMode === 'message' || this.props.displayMode === 'clock' || this.props.displayMode === 'video') {
            return (
                <MessageFrontendComponent
                    diplayMode={this.props.displayMode}
                    MessageText={this.props.messageText.MessageText}
                    MessageTime={this.props.messageText.MessageTime}
                    VideoVersion={this.props.messageText.VideoVersion}
                    displayFormat={"lcd"}
                />
            )
        } else if (this.props.displayMode === 'result') {
            return (
                <ResultFrontendComponent
                    diplayMode={this.props.displayMode}
                    ResultJson=' todo this.props.ResultJson' 
                />
            )
        } else {
            return (
                <BaseFrontendComponent
                    startdelayms={this.props.startdelayms}
                    EventHeat={this.props.EventHeat}
                    lanes={this.props.lanes}
                    displayMode={this.props.displayMode}
                    runningTime={this.props.startdelayms.toString()}
                />)
        }
    }

    render() {

        console.log(this.props.messageText)
        console.log('Display Mode: ' + this.props.displayMode)

        return (
            this.getDisplayData()
        )
    }
}


/*

            <BaseFrontendComponent
                startdelayms={this.props.startdelayms}
                EventHeat={this.props.EventHeat}
                lanes={this.props.lanes}
                displayMode={this.props.displayMode}
                runningTime={this.props.startdelayms.toString()}
            />
            */