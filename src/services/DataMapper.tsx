import { useState } from 'react';
import { eventHeat } from '../..//shared/types/EventHeat';
import { LaneState } from '../../shared/state/LaneState'
import { BaseFrontendComponent } from '../components/BaseFrontendComponent';

let correctValueForLaneNull = 0;
const mylane: [LaneState] = [{
    changed: 0,
    finishtime: '',
    islaptime: false,
    lane: '0',
    laptime:'',
    place:'',
    swimmerData: 
        {
            clubid:'',
            clubname:'',
            name:''
        }
    
}];

//function DataMapper({ jsonData }: { jsonData: any }, { DisplayMode }: { DisplayMode: string },
//  { heatNumber }: { heatNumber: string }, { eventNumber }: { eventNumber: string }) {
function DataMapper(model: {
    CompetitionName: string;
    jsonData: any;
    DisplayMode: string;
    startdelayms: number;
    runningtime: string;
    eventheat: eventHeat;
}) {

    const [eventHeat, setEventHeat] = useState<eventHeat>({ eventnr: '0', heatnr: '0', name: '' });
    const [lanes, setLanes] = useState<[LaneState] | []>([])
    const [jsonData, setJsonData] = useState('')
    const [displayMode, setDisplayMode] = useState('')

    if (model.eventheat.heatnr !== eventHeat.heatnr || model.eventheat.eventnr !== eventHeat.eventnr) {
     
        console.log('DataMapper old Heat: ' + eventHeat.heatnr + ' WK: ' + eventHeat.eventnr )
        console.log('DataMapper new Heat: ' + model.eventheat.heatnr + ' WK: ' + model.eventheat.heatnr )

        setEventHeat(model.eventheat);

    }

    if (model.DisplayMode !== displayMode) {
        console.log('DataMapper changed displaymode to ' + model.DisplayMode)
        setDisplayMode(model.DisplayMode)
    }

    function onLaneChange(lane: number, LaneData: any) {
        if (lane === -1) {
            console.log("+++++ clear all")
            correctValueForLaneNull = 0;
            setLanes([])
        } else {

            // eslint-disable-next-line
            if (lane == 0 && correctValueForLaneNull != 1) {
                console.log("+++++ 0")
                correctValueForLaneNull = 1;
            }

            var lengthLanes = mylane !== undefined ? mylane.length : 0
            var sizeLanes = lengthLanes - correctValueForLaneNull

            if (lane > sizeLanes) {
                console.log(lane + ": new (" + correctValueForLaneNull + ")")
                mylane.push(LaneData)
            } else {
                mylane[lane - 1 + correctValueForLaneNull] = (LaneData)
                //console.log(lane + ": lane change (" + correctValueForLaneNull + ")")
            }
            setLanes(mylane)
        }
    }

    if (model.jsonData !== undefined) {
        if (model.jsonData.lane !== undefined) {
            if (model.jsonData !== jsonData) {
                setJsonData(model.jsonData)
                //console.log('DataMapper jsondata ' + model.jsonData.lane)
                onLaneChange(model.jsonData.lane,model.jsonData)
            }
        }
    }

    return (
            <BaseFrontendComponent
                startdelayms={model.startdelayms}
                EventHeat={eventHeat}
                lanes={lanes}
                displayMode={displayMode}
                runningTime={'100'}
            />
    );
}

export default DataMapper;