import React from "react";
import classnames from 'classnames';
import SwimmerLogo from "../../eventlogos/SwimmerLogo";
import TopEventNameHeader from "../svg/TopEventNameHeader";
import MessageLane from "../svg/MessageLane";
import windowParameter from "../../utilities/windowParameter";
import AnalogClock from "../clock/BoardClock";

export interface MessageBox {
    MessageText: string;
    MessageTime: string;
}

export type MessageState = {
    Message: string;
    MessageTime: string;
}

export class MessageBoxComponent extends React.Component<MessageBox, MessageState>{

    windowParams: windowParameter = new windowParameter();

    constructor(props: MessageBox) {
        super(props)
        this.state = {
            Message: this.props.MessageText,
            MessageTime: this.props.MessageTime
        }
    }

    componentDidUpdate(prevProps: MessageBox) {
        if (prevProps !== this.props) {
            this.setState({ Message: this.props.MessageText })
            this.setState({ MessageTime: this.props.MessageTime })
        }
    }

    splitMessageLines() {
        var webcontent;
        let noSpaceContainerVertical = classnames('noSpaceContainerVertical');

        var strmessage = this.state.Message.toString();
        var lines = strmessage.split('\\n');
        webcontent = <div key="500" className={noSpaceContainerVertical}>
            {lines.map((msg, index) => (
                <div key={index + 700}>
                    {this.getStandardHeader(msg, index)}
                </div>
            ))}
            <AnalogClock type="digital" unixcompetitiontime={this.props.MessageTime} />
        </div>
        return webcontent;

    }

    getStandardHeader(EventName: string, index: number) {

        let noSpaceContainerHorizontal = classnames('noSpaceContainerHorizontal');

        if (this.windowParams.getOnlyLaneAndPlace()) {
            return <MessageLane EventName={EventName} />
        } else {
            if (index < 1) {
                return <div className={noSpaceContainerHorizontal}>
                    <div>
                        <SwimmerLogo />
                    </div>
                    <TopEventNameHeader EventName={EventName} />
                </div>
            } else {
                return <MessageLane EventName={EventName} />
            }
        }
    }

    render() {
        //console.log('MessageBoxComponent')
        return (
            <div>
                {this.splitMessageLines()}
            </div>
        )
    }
}