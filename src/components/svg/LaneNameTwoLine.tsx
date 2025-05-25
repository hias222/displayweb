import React from 'react';
import classnames from 'classnames';
import windowParameter from '../../utilities/windowParameter';


interface LaneNameTwoLineInterface {
    LaneNameTwoLine: string;
    AgeText: string;
    ClubName: string;
    IsOnlyBox: boolean;
}

export default class LaneNameTwoLine extends React.Component<LaneNameTwoLineInterface, {}> {

    windowParams: windowParameter;

    constructor(props: LaneNameTwoLineInterface) {
        super(props);
        this.windowParams = new windowParameter();
    }

    getNameText() {
        let textlanetwolinesvg = classnames('textlanetwolinesvg');
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
                className={textlanetwolinesvg}
                y={this.windowParams.getBoxTextFromTop()/2}
                x="0"
            >
                {this.props.LaneNameTwoLine}</text>
        }

    }

    getAgeText(length: number) {

        if (this.windowParams.showAgeStartlists()) {

            if (this.props.IsOnlyBox) {
                let textlanetwolinesvg = classnames('textlanetwolinesvg');
                return <text
                    className={textlanetwolinesvg}
                    y={this.windowParams.getBoxTextFromTop()/2}
                    x={length - 5}
                    textAnchor="end"
                >
                    {this.props.AgeText}</text>
            } else {
                let textlanetwolinesvg = classnames('textlanetwolinesvg');
                return <text
                    className={textlanetwolinesvg}
                    y={this.windowParams.getBoxTextFromTop()}
                    x={length - 5}
                    textAnchor="end"
                >
                    {this.props.AgeText}xx</text>
            }
        }
    }

    getClubText(length: number) {

        if (this.windowParams.showClubs()) {
            let textlanetwolinesvg = classnames('textlanetwolinesvg');
            return <text
                className={textlanetwolinesvg}
                y={this.windowParams.getBoxTextFromTop()}
                x="0"
            >
                {this.props.ClubName}</text>
        }
    }

    render() {

        let gradient_name = classnames('gradient_name');

        let time_length_normal_short = this.windowParams.getPictureLength() + this.windowParams.getPictureStart() - (2 * this.windowParams.getBoxNumberWidth()) - this.windowParams.getBoxTimeLaneWidth();
        let time_length_normal_long = this.windowParams.getPictureLength() + this.windowParams.getPictureStart() - (2 * this.windowParams.getBoxNumberWidth()) - this.windowParams.getBoxTimeLaneWidth() - this.windowParams.getlengthMedalFinishList();
        
        //this.windowParams.getWindowWidth() > 300 || 
        let time_length_normal = this.windowParams.getShowMedals() ? time_length_normal_long : time_length_normal_short
        let time_length_half = (this.windowParams.getPictureLength() / 2) - (2 * this.windowParams.getBoxNumberWidth()) - this.windowParams.getBoxTimeLaneWidth();

        let time_length = this.windowParams.getLanestwocolumns() === true ? time_length_half : time_length_normal

        let normal_length = this.windowParams.getPictureLength() + this.windowParams.getPictureStart() - this.windowParams.getBoxNumberWidth();
        let half_length = (this.windowParams.getPictureLength() / 2) + this.windowParams.getPictureStart() - this.windowParams.getBoxNumberWidth();

        let name_length = this.windowParams.getLanestwocolumns() === true ? half_length : normal_length

        let length = this.props.IsOnlyBox === true ? name_length : time_length
        let boxheight = this.windowParams.getBoxheight();

        let viewBoxSize = "0 0 " + length + " " + this.windowParams.getBoxheight()
        let boxSize = "M 0 0 h " + length + " v " + boxheight + " h -" + (length + 30) + " z"

        return (<svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMaxYMax meet"
            id="svg8"
            version="1.1"
            viewBox={viewBoxSize}
            height={this.windowParams.getBoxheight()}
        >

            <g id="LaneNameTwoLine1">
                <path
                    transform="scale(1)"
                    className={gradient_name}
                    d={boxSize}
                />
                {this.getNameText()}
                {this.getAgeText(length)}
                {this.getClubText(length)}
            </g>
        </svg>
        );
    }
}