import { LaneState } from "../state/LaneState";

function getIsLap(place: any): boolean {

    if (place === '0') {
        return true
    } else {
        return false
    }
}

export function correctItem(jsondata: any): LaneState {

    let laneState: LaneState =
    {
        changed: 0,
        finishtime: jsondata.finishtime,
        islaptime: getIsLap(jsondata.place),
        lane: jsondata.lane,
        laptime: Date.now().toString(),
        place: jsondata.place,
        swimmerData: {
            clubid: jsondata.code,
            clubname: jsondata.name,
            name: jsondata.lastname,
        },
    }
    return laneState

}