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

    //REACT_APP_SHOW_NUMBER_PLACES
    SHOW_NUMBER_PLACES: number;
    SHOW_MARQUEE: string;

    constructor(props: ResultInterface) {
        super(props)
        this.SHOW_NUMBER_PLACES = process.env.REACT_APP_SHOW_NUMBER_PLACES === undefined ? 3 : parseInt(process.env.REACT_APP_SHOW_NUMBER_PLACES)
        this.SHOW_MARQUEE = process.env.REACT_APP_SHOW_MARQUEE === undefined ? 'false' : process.env.REACT_APP_SHOW_MARQUEE

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
                name: '',
                age: ''
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
        var firstResults = results.filter(results => parseInt(results.place, 10) < this.SHOW_NUMBER_PLACES + 1)
        //console.log(firstResults + ' ' + this.SHOW_NUMBER_PLACES)
        return firstResults
    }

    getLastResults(results: [resultSwimmerData]) {
        var lastResults = results.filter(results => parseInt(results.place, 10) > this.SHOW_NUMBER_PLACES)
        return lastResults
    }

    checkShowMarquee(results: [resultSwimmerData]) {

        if (this.SHOW_MARQUEE === 'false') {
            return false;
        } else {
            if (results[0] !== undefined) {
                if (results[0].lastname !== '') {
                    return true
                } else {
                    return false
                }
            } else {
                return false;
            }
        }

    }

    getOthers() {
        if (this.SHOW_NUMBER_PLACES < 4) {
            if (this.checkShowMarquee(this.state.swimmerResults)) {
                return <RankOthers swimmerResults={this.getLastResults(this.state.swimmerResults)} />
            }
        }
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
            {this.getOthers()}
        </div>
        )
    }
}
