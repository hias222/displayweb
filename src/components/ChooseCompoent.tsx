import Box from "@mui/material/Box";
import React from "react";
import { useEffect, useState } from "react";
import { ChooseInterface } from "../interfaces/ChooseInterface";
import windowParameter from "../utilities/windowParameter";
import classnames from 'classnames';
import { BaseFrontendComponent } from "./BaseFrontendComponent";
import { MessageFrontendComponent } from "./messages/MessageFrontendComponent";
import { ResultFrontendComponent } from "./result/ResultFrontendComponent";



function ChooseComponent(model: ChooseInterface) {
    //extends React.Component<ChooseInterface, {}> {

    const [chooseComponent, setChooseComponent] = useState<ChooseInterface>();

    var windowParams: windowParameter = new windowParameter();
    var statictable = classnames('statictable');

    const handleFullscreen = () => (event: any) => {
        //Fullscreen
        console.log('Fullscreen' + event)
        
        const el = document.documentElement;
        if (el.requestFullscreen) {
            el.requestFullscreen();
        }
        
        /*
        else if (el.mozRequestFullScreen) {
            el.mozRequestFullScreen()
        } else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen()
        } else if (el.msRequestFullscreen) {
            el.msRequestFullscreen()
        }
        */
        
    };


    const buttonfullscreen = () =>  {
        return ( <div>
            <Box height={30}></Box>
            <Box height={50}>
                <div>
                    <button onClick={handleFullscreen()}>Full screen </button>
                </div>
            </Box>
        </div>);
    }


    function getDisplayData() {
        if (chooseComponent !== undefined) {
            if (chooseComponent?.displayMode === 'message' || chooseComponent?.displayMode === 'clock' || chooseComponent?.displayMode === 'video') {
                return (
                    <MessageFrontendComponent
                        diplayMode={chooseComponent.messageText.diplayMode}
                        MessageText={chooseComponent.messageText.MessageText}
                        MessageTime={chooseComponent.messageText.MessageTime}
                        VideoVersion={chooseComponent.messageText.VideoVersion}
                        displayFormat={"lcd"}
                    />
                )
            } else if (chooseComponent.displayMode === 'result') {
                return (
                    <ResultFrontendComponent
                        diplayMode={chooseComponent.displayMode}
                        ResultJson={chooseComponent.result}
                    />
                )
            } else {
                return (
                    <BaseFrontendComponent
                        startdelayms={chooseComponent.startdelayms}
                        EventHeat={chooseComponent.EventHeat}
                        lanes={chooseComponent.lanes}
                        displayMode={chooseComponent.displayMode}
                        runningTime={chooseComponent.runningTime}
                        round={chooseComponent.round}
                    />)
            }
        } else {
            return (
                <div> No Data</div>
            )
        }
    }

    useEffect(() => {
        setChooseComponent(model)
        //console.log(model)
    }, [model]);

    return (
        <div>
            <Box width={windowParams.window_width} height={windowParams.window_height} className={statictable}>
                {getDisplayData()}
            </Box>
            <Box>
                {buttonfullscreen()}
            </Box>
        </div >
    );
}

export default ChooseComponent;
