import React from "react";
import RankBox from "../rank/RankBox";
import RankOthers from "../rank/RankOthers";
import RankStyledLane from "../rank/RankStyledLane";
import RankTopHeader from "../rank/RankTopHeader";
import { eventDefinition } from "./types/eventDefinition";
import { resultSwimmerData } from "./types/ResultSwimmerData";

export type MessageType = {
    displayMode: string;
    ResultJson: string;
    swimmerResults: [resultSwimmerData];
    eventDefinition: eventDefinition;
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
            swimmerResults: [
                {
                    firstname: '',
                    lastname: '',
                    name: '',
                    place: ''
                }
            ],
            eventDefinition: {
                competition: '',
                eventNumber: '',
                name: ''
            }
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
        this.setState({ swimmerResults: jsonResult.swimmerResults });
    }

    getFirst3Results(results: [resultSwimmerData]) {
        var firstResults = results.filter(results => parseInt(results.place, 10) < 4)
        console.log(firstResults)
        return firstResults
    }

    getLastResults(results: [resultSwimmerData]) {
        var lastResults = results.filter(results => parseInt(results.place, 10) > 3)
        return lastResults
    }

    render() {

        return (<div>
            <RankTopHeader eventDefinition={this.state.eventDefinition} />
            <RankBox />
            {this.getFirst3Results(this.state.swimmerResults).map((swimmer: resultSwimmerData, index) => (
                <div key={index}>
                    <RankStyledLane swimmer={swimmer} />
                </div>
            ))}
            <RankBox />
            <RankOthers swimmerResults={this.getLastResults(this.state.swimmerResults)} />
        </div>
        )
    }
}
