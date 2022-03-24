import React from "react";
import { ResultBoxComponent } from "./ResultBoxComponent";

export type MessageType = {
    displayMode: string;
    ResultJson: string;
    swimmerResults: [];
    eventDefinition: {};
}

export interface ResultInterface {
    diplayMode: string;
    ResultJson: string;
}


export class ResultFrontendComponent extends React.Component<ResultInterface, MessageType> {

    constructor(props: ResultInterface) {
        super(props)
        this.state = {
            displayMode: this.props.diplayMode,
            ResultJson: this.props.ResultJson,
            swimmerResults: [],
            eventDefinition: {}
        }
    }

    componentDidUpdate(prevProps: ResultInterface) {
        if (prevProps !== this.props) {
            this.analyseJson();
            this.setState({ displayMode: this.props.diplayMode })
            this.setState({ ResultJson: this.props.ResultJson })

        }
    }

    analyseJson() {
        var jsonResult = JSON.parse(JSON.stringify(this.props.ResultJson));
        this.setState({ eventDefinition: jsonResult.eventDefinition });
        this.setState({swimmerResults:jsonResult.swimmerResults});
    }

    render() {

        return <ResultBoxComponent eventDefinition={this.state.eventDefinition} swimmerResults={this.state.swimmerResults} />
    }
}
