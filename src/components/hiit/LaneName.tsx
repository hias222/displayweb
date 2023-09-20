import React from 'react';
import classnames from 'classnames';
import windowParameter from '../../utilities/windowParameter';


interface LaneNameInterface {
    LaneName: string;
    AgeText: string;
    ClubName: string;
    IsOnlyBox: boolean;
}

export default class LaneName extends React.Component<LaneNameInterface, {}> {

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
                x="0"
            >
                {this.props.LaneName}</text>
        }

    }
    getAgeText(length: number) {
        if (this.props.IsOnlyBox) {
            let textlanesvg = classnames('textlanesvg');
            return <text
                className={textlanesvg}
                y={this.windowParams.getBoxTextFromTop()}
                x={length - 5}
                textAnchor="end"
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
                y={this.windowParams.getBoxTextFromTop()}
                x={startrNameSpace}
            >
                {this.props.ClubName}</text>
        }
    }

    render() {

        let gradient_name = classnames('gradient_name');

        let time_length = this.windowParams.getPictureLength() + this.windowParams.getPictureStart() - (2 * this.windowParams.getBoxNumberWidth()) - this.windowParams.getBoxTimeLaneWidth() - this.windowParams.getlengthMedalFinishList();
        let length = this.props.IsOnlyBox === true ? this.windowParams.getPictureLength() + this.windowParams.getPictureStart() - this.windowParams.getBoxNumberWidth() : time_length
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

            <g id="LaneName1">
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