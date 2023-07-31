import { LaneState } from "../state/LaneState";
import { eventHeat } from "../types/EventHeat";
import { swimmerData } from "../types/SwimmerData";
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

function checkExistingEndPlace(endPlace: string, swimmer: swimmerData, newData: any) {
    // Wenn der Lauf sich nicht ändert löscht er die Zeit nicht (Platz wird gelöscht)
    //man könnte abhägig vond er laufenden Zeit, wenn länger als 1 Minute die Ziet behalten (zu spät lauf weitergesachaltet)
    // bräuchte man die Info über die aktuell Laufzeit -> ToDo
    //console.log(endTime + ' ' + newData.finishtime)
    if (endPlace !== "undefined") {
        if (swimmer.heat === newData.heat && swimmer.event === newData.event && newData.place === "undefined") {
            //console.log('correct')
            return endPlace
        } else {
            return newData.place
        }
    } else {
        return newData.place
    }
}


function checkExistingEndTime(endTime: string, swimmer: swimmerData, newData: any) {
    // Wenn der Lauf sich nicht ändert löscht er die Zeit nicht (Platz wird gelöscht)
    //man könnte abhägig vond er laufenden Zeit, wenn länger als 1 Minute die Ziet behalten (zu spät lauf weitergesachaltet)
    // bräuchte man die Info über die aktuell Laufzeit -> ToDo
    //console.log(endTime + ' ' + newData.finishtime)
    if (endTime !== "undefined") {
        if (swimmer.heat === newData.heat && swimmer.event === newData.event && newData.finishtime === "undefined") {
            //console.log('correct time ')
            //console.log(newData)
            //console.log(swimmer)
            return endTime
        } else {
            return newData.finishtime
        }
    } else {
        return newData.finishtime
    }
}

export function correctItem(jsondata: any, Jsonlane: LaneState): LaneState {

    var emptySwimmer: swimmerData = { clubid: '', clubname: '', name: '', heat: 0, event: 0 }

    var oldChange = Jsonlane === undefined ? Date.now() : Jsonlane.changed
    var KeyJsomlanes = Jsonlane === undefined ? '' : Jsonlane.lane + Jsonlane.finishtime + Jsonlane.swimmerData.name + Jsonlane.place
    var Keyjsondata = jsondata === undefined ? '' : jsondata.lane + jsondata.finishtime + jsondata.lastname + jsondata.place

    //console.log(checkExistingEndTime(Jsonlane.finishtime, Jsonlane.swimmerData, jsondata));

    //klappt nicht bei neuen Zeiten ...
    var finishtime = Jsonlane === undefined ? "undefined" : Jsonlane.finishtime
    var endplace = Jsonlane === undefined ? "undefined" : Jsonlane.place
    var swimmer: swimmerData = Jsonlane === undefined ? emptySwimmer : Jsonlane.swimmerData
    //checkExistingEndTime(finishtime, swimmer, jsondata),

    let laneState: LaneState =
    {
        changed: getChangedate(KeyJsomlanes, Keyjsondata, oldChange),
        finishtime: checkExistingEndTime(finishtime, swimmer, jsondata),
        islaptime: getIsLap(jsondata.place),
        lane: jsondata.lane,
        laptime: "",
        place: checkExistingEndPlace(endplace, swimmer, jsondata),
        entrytime: getEntryTime(jsondata.entrytime),
        swimmerData: {
            clubid: jsondata.code,
            clubname: jsondata.name,
            name: jsondata.lastname,
            birthyear: getBirthYear(jsondata.birthdate),
            firstName: jsondata.firstname,
            heat: jsondata.heat,
            event: jsondata.event,
        },
    }
    return laneState
}

export function correctDisplaymode(jsondata: any, DisplayMode: string, eventheat: eventHeat): string {
    //console.log(DisplayMode)
    //console.log(eventheat)
    if (jsondata.place === '0') {
       // console.log(jsondata)
       // console.log('set to race')
        return 'race'
    } else if (jsondata.finishtime === "undefined" || !jsondata.finishtime) {
        if (DisplayMode !== 'startlist' && DisplayMode !== 'race') {
            return 'startlist'
        } else {
            return DisplayMode
        }
    } else if (jsondata.event !== eventheat.eventnr || jsondata.heat !== eventheat.heatnr) {
        return DisplayMode
    }
    else {
        if (DisplayMode !== 'race') {
         //   console.log(jsondata)
         //   console.log('set to race else')
            return 'race'
        }
        return DisplayMode
    }
}