import React from "react";
import RankStyledLane from "../rank/RankStyledLane";

export interface ResultMessage {
    swimmerResults: [];
    eventDefinition: {}
}

export type ResultState = {
    swimmerResults: [];
    eventDefinition: {};
}

export class ResultBoxComponent extends React.Component<ResultMessage, ResultState>{

    constructor(props: ResultMessage) {
        super(props)
        this.state = {
            swimmerResults: this.props.swimmerResults,
            eventDefinition: this.props.eventDefinition
        }
    }

    componentDidUpdate(prevProps: ResultMessage) {
        if (prevProps !== this.props) {
            this.setState({ swimmerResults: this.props.swimmerResults })
            this.setState({ eventDefinition: this.props.eventDefinition })
        }
    }

    getEventDetails() {
        var newEvent = JSON.parse(JSON.stringify(this.state.eventDefinition));
        return newEvent.name;
    }

    getSwimmerDetails(swimmer: any) {
        var newSwimmer = JSON.parse(JSON.stringify(swimmer));
        return newSwimmer.place + ': ' + newSwimmer.firstname + ' ' + newSwimmer.lastname;
    }

    render() {
        return (<div>
            {this.getEventDetails()}
            {this.props.swimmerResults.map((swimmer, index) => (
                <div key={index}>
                    <RankStyledLane place={"1"} swimmer={this.getSwimmerDetails(swimmer)} />
                </div>
            ))}
        </div>
        )
    }
}