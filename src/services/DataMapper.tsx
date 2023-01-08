import { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { eventHeat } from '../types/EventHeat';
import { LaneState } from '../state/LaneState'
import React from 'react';
import ChooseComponent from '../components/ChooseCompoent';
import { TextMessageType } from '../types/TextMessageType';


function DataMapper(model: {
    CompetitionName: string;
    jsonData: any;
    DisplayMode: string;
    startdelayms: number;
    runningtime: string;
    eventheat: eventHeat;
    Jsonlanes: LaneState[];
    TextMessage: TextMessageType;
    Result: string;
}) {

    const [eventHeat, setEventHeat] = useState<eventHeat>({ eventnr: '0', heatnr: '0', name: '' });
    const [lanes, setLanes] = useState<LaneState[] | []>([])
    const [jsonData, setJsonData] = useState('')
    const [displayMode, setDisplayMode] = useState('')

    if (model.eventheat.heatnr !== eventHeat.heatnr || model.eventheat.eventnr !== eventHeat.eventnr) {
        console.log('DataMapper old Heat: ' + eventHeat.heatnr + ' WK: ' + eventHeat.eventnr)
        console.log('DataMapper new Heat: ' + model.eventheat.heatnr + ' WK: ' + model.eventheat.heatnr)
        setEventHeat(model.eventheat);
    }

    if (model.DisplayMode !== displayMode) {
        console.log('DataMapper changed displaymode to ' + model.DisplayMode)
        setDisplayMode(model.DisplayMode)
    }

    function setLanesData(Jsonlanes: LaneState[]) {
        //console.log(Jsonlanes);
        setLanes(Jsonlanes)
    }


    if (model.jsonData !== undefined) {
        if (model.jsonData.lane !== undefined) {
            if (model.jsonData !== jsonData) {
                setJsonData(model.jsonData)
                //console.log('DataMapper jsondata ' + model.jsonData.lane)
                //onLaneChange(model.jsonData.lane,model.jsonData)
                setLanesData(model.Jsonlanes);
            }
        }
    }

    return (
        <div>
            <ChooseComponent
                startdelayms={model.startdelayms}
                EventHeat={eventHeat}
                lanes={lanes}
                displayMode={displayMode}
                runningTime={model.runningtime}
                messageText={model.TextMessage}
                result={model.Result}
            />
        </div>
    );
}

export default DataMapper;