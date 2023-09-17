import Box from "@mui/material/Box";
import React from "react";
import { useEffect, useState } from "react";
import { ChooseInterface } from "../interfaces/ChooseInterface";
import windowParameter from "../utilities/windowParameter";
import classnames from 'classnames';
import { BaseFrontendComponent } from "./BaseFrontendComponent";
import { MessageFrontendComponent } from "./messages/MessageFrontendComponent";
import { ResultFrontendComponent } from "./result/ResultFrontendComponent";
import { SingleLaneFrontendComponent } from "./SingleLaneFrontendComponent";
import { Best3FrontendComponent } from "./Best3FrontendComponent";
import { HiitFrontendComponent } from "./hiit/HiitFrontendComponent";

function ChooseComponent(model: ChooseInterface) {
   
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


    const buttonfullscreen = () => {
        return (<div>
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
            //console.log('set displaymode ChooseComponent ' + chooseComponent.displayMode  + " Version " + chooseComponent.messageText.VideoVersion)
            if (chooseComponent?.displayMode === 'message' || chooseComponent?.displayMode === 'clock' || chooseComponent?.displayMode === 'video') {
                return (
                    <MessageFrontendComponent
                        diplayMode={chooseComponent.displayMode}
                        MessageText={chooseComponent.messageText.MessageText}
                        MessageTime={chooseComponent.messageText.MessageTime}
                        VideoVersion={chooseComponent.messageText.VideoVersion}
                        displayFormat={chooseComponent.messageText.diplayMode}
                    />
                )
            } else if (chooseComponent.displayMode === 'hiit') {
                return (
                    <HiitFrontendComponent
                        HiitState={chooseComponent.hiit}
                    />
                )
            } 
            else if (chooseComponent.displayMode === 'result') {
                return (
                    <ResultFrontendComponent
                        diplayMode={chooseComponent.displayMode}
                        ResultJson={chooseComponent.result}
                    />
                )
            } else if (chooseComponent.displayMode === 'best3') {
                return (
                    <Best3FrontendComponent
                        changeMode={chooseComponent.ChangeMode}
                        startdelayms={chooseComponent.startdelayms}
                        EventHeat={chooseComponent.EventHeat}
                        lanes={chooseComponent.lanes}
                        displayMode={chooseComponent.displayMode}
                        runningTime={chooseComponent.runningTime}
                        round={chooseComponent.round}
                        lastUpdate={new Date()}
                    />)
                
            } else if (chooseComponent.displayMode.startsWith('lane')) {
                //console.log('set displaymode ChooseComponent lane ' + chooseComponent?.displayMode )
                return (
                    <SingleLaneFrontendComponent
                        changeMode={chooseComponent.ChangeMode}
                        startdelayms={chooseComponent.startdelayms}
                        EventHeat={chooseComponent.EventHeat}
                        lanes={chooseComponent.lanes}
                        displayMode={chooseComponent.displayMode}
                        runningTime={chooseComponent.runningTime}
                        round={chooseComponent.round}
                        lastUpdate={new Date()}
                    />)
            } else {
                //console.log('set displaymode ChooseComponent default ' + chooseComponent?.displayMode )
                return (
                    <BaseFrontendComponent
                        changeMode={chooseComponent.ChangeMode}
                        startdelayms={chooseComponent.startdelayms}
                        EventHeat={chooseComponent.EventHeat}
                        lanes={chooseComponent.lanes}
                        displayMode={chooseComponent.displayMode}
                        runningTime={chooseComponent.runningTime}
                        round={chooseComponent.round}
                        lastUpdate={new Date()}
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
        
        //console.log(model.lanes)
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
