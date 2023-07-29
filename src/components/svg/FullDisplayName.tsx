import React from 'react';
import classnames from 'classnames';
import windowParameter from '../../utilities/windowParameter';


interface LaneNameInterface {
    LaneName: string;
    AgeText: string;
    ClubName: string;
    IsOnlyBox: boolean;
    EntryTime?: string;
}

export default class FullDisplayName extends React.Component<LaneNameInterface, {}> {

    windowParams: windowParameter;

    constructor(props: LaneNameInterface) {
        super(props);
        this.windowParams = new windowParameter();
    }

    getNameText() {
        let textlanesvg = classnames('textlanesvg');
        if (this.windowParams.getShowOnlyClub()) {
            return <text
            className={textlanesvg}
            y={this.windowParams.getBoxTextFromTop()}
            x="0"
        >
            {this.props.ClubName}</text>
        } else {
            return <text
                className={textlanesvg}
                y={this.windowParams.getBoxTextFromTop()}
                x={this.windowParams.getPictureLength()/2}
                textAnchor="middle"
            >
                {this.props.LaneName}</text>
        }
    }

    getAgeText(length: number) {
        if (this.props.IsOnlyBox) {
            let textlanesvg = classnames('textlanesvg');
            return <text
                className={textlanesvg}
                y={300}
                x={this.windowParams.getPictureLength()/2}
                textAnchor="middle"
            >
                {this.props.AgeText}</text>
        }
    }

    getClubText(length: number) {

        var startrNameSpace = this.props.IsOnlyBox ? this.windowParams.getSpaceNameStartlist() + 4 : this.windowParams.getSpaceNameFinishlist() + 4

        if (this.windowParams.showClubs()) {
            let textlanesvg = classnames('textlanesvg');
            return <text
                className={textlanesvg}
                y={100}
                x={this.windowParams.getPictureLength()/2}
                textAnchor="middle"
            >
                {this.props.ClubName}</text>
        }
    }

    getEntryTime() {

          if (this.windowParams.showClubs()) {
            let textlanesvg = classnames('textlanesvg');
            return <text
                className={textlanesvg}
                y={250}
                x={this.windowParams.getPictureLength()/2}
                textAnchor="middle"
            >
                {this.props.EntryTime}</text>
        }
    }

    render() {

        let gradient_name = classnames('gradient_name');

        let time_length = this.windowParams.getPictureLength() + this.windowParams.getPictureStart() - (2 * this.windowParams.getBoxNumberWidth()) - this.windowParams.getBoxTimeLaneWidth() - this.windowParams.getlengthMedalFinishList();
        let length = this.props.IsOnlyBox === true ? this.windowParams.getPictureLength() + this.windowParams.getPictureStart() - this.windowParams.getBoxNumberWidth() : time_length
        //let boxheight = this.windowParams.getBoxheight();

        let boxheight = 300
        let boxheight1 = 300

        let viewBoxSize = "0 0 " + length + " " + boxheight
        let boxSize = "M 0 0 h " + length + " v " + boxheight1 + " h -" + (length + 30) + " z"
        
        return (<svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMaxYMax meet"
            id="svg8"
            version="1.1"
            viewBox={viewBoxSize}
            height={boxheight}
        >

            <g id="LaneName1123">
                <path
                    transform="scale(1)"
                    className={gradient_name}
                    d={boxSize}
                />
                {this.getNameText()}
                {this.getAgeText(length)}
                {this.getClubText(length)}
                {this.getEntryTime()}
            </g>
        </svg>
        );
    }
}