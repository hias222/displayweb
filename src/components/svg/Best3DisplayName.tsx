import React from 'react';
import classnames from 'classnames';
import windowParameter from '../../utilities/windowParameter';


interface LaneResultInterface {
    LaneName: string;
    AgeText: string;
    ClubName: string;
    IsOnlyBox: boolean;
    Place?: string;
    FinishTime?: string;
}

export default class Best3DisplayName extends React.Component<LaneResultInterface, {}> {

    windowParams: windowParameter;

    constructor(props: LaneResultInterface) {
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
                x={0}
                textAnchor="left"
            >
               {this.props.LaneName}</text>
        }
    }

    getClubText(length: number) {

        if (this.windowParams.showClubs()) {
            let textlanesvg = classnames('textlanesvg');
            return <text
                className={textlanesvg}
                y={this.windowParams.getBoxheight() + this.windowParams.getBoxTextFromTop()}
                x={0}
                textAnchor="left"
            >
                {this.props.ClubName}</text>
        }
    }

    render() {

        let gradient_name = classnames('gradient_name');

        let time_length = this.windowParams.getPictureLength() + this.windowParams.getPictureStart() - (2 * this.windowParams.getBoxNumberWidth()) - this.windowParams.getBoxTimeLaneWidth() - this.windowParams.getlengthMedalFinishList();
        let length = this.props.IsOnlyBox === true ? this.windowParams.getPictureLength() + this.windowParams.getPictureStart() - this.windowParams.getBoxNumberWidth() : time_length
        let boxheight = this.windowParams.getBoxheight() * 2

        let viewBoxSize = "0 0 " + length + " " + boxheight
        let boxSize = "M 0 0 h " + length + " v " + boxheight + " h -" + (length + 30) + " z"

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
                {this.getClubText(length)}
            </g>
        </svg>
        );
    }
}