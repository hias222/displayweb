import React from 'react';
import classnames from 'classnames';
import windowParameter from '../../../utilities/windowParameter';


interface RankInterface {
    Name: string;
    Birthdate: string;
    Club: string;
    IsOnlyBox: boolean;
}

export default class RankName extends React.Component<RankInterface, {}> {

    windowParams: windowParameter;

    constructor(props: RankInterface) {
        super(props);
        this.windowParams = new windowParameter();
    }


    getAgeText(length: number) {

        if (this.windowParams.showAgeResults()) {
            let textranksvg = classnames('textranksvg');
            return <text
                className={textranksvg}
                y={this.windowParams.getBoxTextFromTop()}
                x={length - this.windowParams.getPictureStart() - 10}
                text-anchor="end"
            >
                {this.props.Birthdate}</text>
        }
    }

    checkName() {
        let namelength = this.windowParams.getLengthNameFinishlist();
        let sizeClub = this.props.Name.length;

        if (sizeClub > (namelength - 2)) {
            return this.props.Name.substr(0, (namelength - 2));
        }
        return this.props.Name
    }

    checkClub() {
        let namelength = this.windowParams.getLengthClubFinishlist();
        let sizeClub = this.props.Club.length;

        if (sizeClub > (namelength - 2)) {
            return this.props.Club.substr(0, (namelength - 2));
        }
        return this.props.Club
    }

    getClubText() {
        if (this.windowParams.showClubs()) {
            let textranksvg = classnames('textranksvg');
            return <text
                className={textranksvg}
                y={this.windowParams.getBoxTextFromTop()}
                x={this.windowParams.getSpaceNameStartlist() + 4}
            >
                {this.checkClub()}</text>
        }
    }

    render() {
        let textranksvg = classnames('textranksvg');
        let gradient_name = classnames('gradient_name');

        let time_length = this.windowParams.getPictureLength() + this.windowParams.getPictureStart() - (2 * this.windowParams.getBoxNumberWidth()) - this.windowParams.getBoxTimeLaneWidth();
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
                <text
                    className={textranksvg}
                    y={this.windowParams.getBoxTextFromTop()}
                    x="0"
                >
                    {this.checkName()}</text>
                {this.getAgeText(length)}
                {this.getClubText()}

            </g>
        </svg>
        );
    }
}