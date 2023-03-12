import { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { eventHeat } from '../types/EventHeat';
import { LaneState } from '../state/LaneState'
import React from 'react';
import ChooseComponent from '../components/ChooseCompoent';
import { TextMessageType } from '../types/TextMessageType';

function delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}

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
    Round: number;
}) {

    const [eventHeat, setEventHeat] = useState<eventHeat>({ eventnr: '0', heatnr: '0', name: '' });
    const [lanes, setLanes] = useState<LaneState[] | []>([])
    const [jsonData, setJsonData] = useState('')
    const [displayMode, setDisplayMode] = useState('')
    const [changedMode, setChangeMode] = useState(false)

    if (model.eventheat.heatnr !== eventHeat.heatnr || model.eventheat.eventnr !== eventHeat.eventnr) {
        console.log('DataMapper old Heat: ' + eventHeat.heatnr + ' WK: ' + eventHeat.eventnr)
        console.log('DataMapper new Heat: ' + model.eventheat.heatnr + ' WK: ' + model.eventheat.eventnr)
        setEventHeat(model.eventheat)
    }


    if (model.DisplayMode !== displayMode) {
        console.log('DataMapper changed displaymode to ' + model.DisplayMode)
        setDisplayMode(model.DisplayMode)
        setChangeMode(true)
        setDisplaymodeAndHeader()
    }

    function setLanesData(Jsonlanes: LaneState[]) {
        setLanes(Jsonlanes)
    }

    async function setDisplaymodeAndHeader() {
        console.log('new Displaymode change');
        await delay(1000);
        setChangeMode(false)
    }

    useEffect(() => {
        //console.log('Mapper Change')
        //console.log(model.Jsonlanes)
        setLanes(model.Jsonlanes)
    }, [model.Jsonlanes]);

    useEffect(() => {
        setJsonData(model.jsonData)
    }, [model.jsonData, model.TextMessage]);

    useEffect(() => {
        if (model.eventheat.heatnr !== eventHeat.heatnr || model.eventheat.eventnr !== eventHeat.eventnr) {
            console.log('DataMapper useEffect old Heat: ' + eventHeat.heatnr + ' WK: ' + eventHeat.eventnr)
            console.log('DataMapper useEffect new Heat: ' + model.eventheat.heatnr + ' WK: ' + model.eventheat.eventnr)
            setEventHeat(model.eventheat);
        }
    }, [model.eventheat.eventnr, model.eventheat.heatnr, model.eventheat, eventHeat.heatnr, eventHeat.eventnr]);


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
                ChangeMode={changedMode}
                startdelayms={model.startdelayms}
                EventHeat={eventHeat}
                lanes={lanes}
                displayMode={displayMode}
                runningTime={model.runningtime}
                messageText={model.TextMessage}
                result={model.Result}
                round={model.Round}
            />
        </div>
    );
}

export default DataMapper;