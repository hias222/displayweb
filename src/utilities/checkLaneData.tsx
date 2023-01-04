import { LaneState } from "../state/LaneState";
import getBirthYear from "./getBirthYear";
import getEntryTime from "./getEntryTime";

function getIsLap(place: any): boolean {

    if (place === '0') {
        return true
    } else {
        return false
    }
}

function getChangedate(KeyJsomlanes: string, Keyjsondata: string, oldchangeDate: number): number {

    if (KeyJsomlanes === Keyjsondata) {
        return oldchangeDate
    } else {
        //console.log('change ' + Keyjsondata)
        return Date.now()
    }

}

export function correctItem(jsondata: any, Jsonlane: LaneState): LaneState {

    var oldChange = Jsonlane === undefined ? Date.now() : Jsonlane.changed
    var KeyJsomlanes = Jsonlane === undefined ? '' : Jsonlane.lane + Jsonlane.finishtime + Jsonlane.swimmerData.name + Jsonlane.place
    var Keyjsondata = jsondata === undefined ? '' : jsondata.lane + jsondata.finishtime + jsondata.lastname + jsondata.place

    var newDate = getChangedate(KeyJsomlanes, Keyjsondata, oldChange)

    let laneState: LaneState =
    {
        changed: newDate,
        finishtime: jsondata.finishtime,
        islaptime: getIsLap(jsondata.place),
        lane: jsondata.lane,
        laptime: "",
        place: jsondata.place,
        entrytime: getEntryTime(jsondata.entrytime),
        swimmerData: {
            clubid: jsondata.code,
            clubname: jsondata.name,
            name: jsondata.lastname,
            birthyear: getBirthYear(jsondata.birthdate),
            firstName: jsondata.firstname,
        },
    }
    return laneState
}

export function correctDisplaymode(jsondata: any, DisplayMode: string): string {
    if (jsondata.place === '0') {
        return 'race'
    } else if (jsondata.finishtime === "undefined" || !jsondata.finishtime) {
        if (DisplayMode !== 'startlist' && DisplayMode !== 'race') {
            return 'startlist'
        } else {
            return DisplayMode
        }
    } else {
        if (DisplayMode !== 'race') {
            return 'race'
        }
        return DisplayMode
    }
}