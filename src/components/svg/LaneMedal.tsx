import React from 'react';
import classnames from 'classnames';
import windowParameter from '../../utilities/windowParameter';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { brown, grey, yellow } from '@mui/material/colors';
import { Box } from '@mui/material';

interface LaneMedalInterface {
    place: string;
}

export default class LaneMedal extends React.Component<LaneMedalInterface, {}> {

    windowParams: windowParameter;

    constructor(props: LaneMedalInterface) {
        super(props);
        this.windowParams = new windowParameter();
    }

    getMedalColor() {
        let boxwidth = this.windowParams.getlengthMedalFinishList()

        if (this.props.place === "1") {
            return (
                <WorkspacePremiumIcon sx={{ color: yellow[500], width: boxwidth, height: boxwidth }} />
            )
        }

        if (this.props.place === "2") {
            return (
                <WorkspacePremiumIcon sx={{ color: grey[200], width: boxwidth, height: boxwidth }} />
            )
        }

        if (this.props.place === "3") {
            return (
                <WorkspacePremiumIcon sx={{ color: brown[600], width: boxwidth, height: boxwidth }} />
            )
        }
    }

    getMedalSVG() {

        let boxwidth = this.windowParams.getlengthMedalFinishList();

        if (this.props.place === "1" || this.props.place === "2" || this.props.place === "3") {
            return (
                <div>
                    <Box width={boxwidth}
                        height={this.windowParams.getBoxheight()}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        {this.getMedalColor()}
                    </Box>
                </div>
            )
        } else {
            return (this.getSpace())
        }

    }

    getSpace() {
        let gradient_lane = classnames('gradient_lane');
        let gradient_lane_stop = classnames('gradient_lane_stop');

        let boxwidth = this.windowParams.getlengthMedalFinishList();
        let viewBoxSize = "0 0 " + boxwidth + " " + this.windowParams.getBoxheight()
        let path_lane = "M 0 0 h " + boxwidth + "," + this.windowParams.getBoxheight() + " h -" + boxwidth + " z"

        return (<svg
            xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"
            id="svg8"
            version="1.1"
            viewBox={viewBoxSize}
            height={this.windowParams.getBoxheight()}>
            <defs>
                <linearGradient id="laneNumberGradient" gradientTransform="rotate(0)">
                    <stop
                        className={gradient_lane}
                        offset="0"
                    />
                    <stop
                        className={gradient_lane_stop}
                        offset="0"
                    />
                </linearGradient>
                <linearGradient
                    gradientUnits="userSpaceOnUse"
                    y2="2"
                    x2="50"
                    y1="-10"
                    x1="20"
                    id="laneGradientStyle"
                    xlinkHref="#laneNumberGradient"
                />
            </defs>
            <g
                id="layernumber1">
                <path
                    transform="scale(1)"
                    d={path_lane}
                    fill="url(#laneGradientStyle)"
                />
            </g>
        </svg>
        );
    }

    render() {
        if (this.windowParams.getShowMedals()) {
            return (
                this.getMedalSVG()
            )
        } else {
            return (this.getSpace())
        }

    }
} 