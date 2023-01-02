import { useEffect, useState } from 'react';
import { eventHeat } from '../types/EventHeat';
import getSwimStyles from '../utilities/getSwimStyles';
import DataMapper from './DataMapper';

import SignalWifiStatusbar4BarIcon from '@mui/icons-material/SignalWifi4Bar';
import PortableWifiOffIcon from '@mui/icons-material/PortableWifiOff';
import { Grid, Typography } from '@mui/material';
import React from 'react';
import { LaneState } from "../state/LaneState";
import { any } from '@tensorflow/tfjs';
//import { LaneData } from '../interfaces/lanedatainterface';

/*
 this.state = {
      WsConnected: false,
      HeatNumber: 0,
      EventNumber: 0,
      CompetitionName: 'new',
      DisplayMode: 'race'
    }
    */

function WkAnalyseData(model: { message: string, connected: boolean, lanes: [] }) {

    const [connectstate, setConnectstate] = useState<boolean>(false)
    const [DisplayMode, setDisplayMode] = useState('');
    const [CompetitionName, setCompetitionName] = useState('')
    const [JsonData, setJsonData] = useState('');
    const [Jsonlanes, setJsonLanes] = useState<LaneState[] | []>([])
    const [startdelayms, setStartdelayms] = useState<number>(0);
    const [runningTime, setRunningTime] = useState('0');
    const [eventheat, setEventHeat] = useState<eventHeat>({
        eventnr: '0',
        heatnr: '0',
        name: '0',
    });

    function setHeaderInfo(jsondata: any) {

        if (jsondata.heat !== eventheat.heatnr || jsondata.event !== eventheat.eventnr) {
            setDisplayMode('startlist')
            var swimstyle = (typeof (jsondata.name) !== "undefined" && jsondata.name)
                ? jsondata.name : jsondata.distance + "m " + getSwimStyles(jsondata.swimstyle)

            setEventHeat(
                {
                    name: swimstyle,
                    eventnr: jsondata.event,
                    heatnr: jsondata.heat,
                    competition: jsondata.competition,
                    distance: jsondata.distance,
                    gender: jsondata.gender,
                    relaycount: jsondata.relaycount,
                    round: jsondata.round,
                    swimstyle: jsondata.swimstyle
                })

            setJsonData(jsondata)
            setCompetitionName(jsondata.competition)
            console.log('WSAnaylseData ------> Heat' + jsondata.heat)
        } else {
            console.log("header no event or heat change ")
        }
        //setTimeout(this.activatePage, 500);
    }

    async function setLaneInfo(jsondata: any, lanes: []) {

        // Inhalt noch editieren

        let newLanes: LaneState[] = [];
        await Promise.all(
            lanes.map(async (item) => {
                newLanes.push(correctItem(item))
            })
        )
        setJsonLanes(newLanes);
        console.log(newLanes)

        //locklanes = true;
        if (jsondata.place === '0') {
            var laptime = "{ \"laptime\": \"" + Date.now() + "\",\"lap\": \"true\" }"
            var newjsondata = { ...jsondata, ...JSON.parse(laptime) }
            //activelapdata = true;
            //this.props.onLaneChange(jsondata.lane, newjsondata)
            setJsonData(newjsondata)
            if (DisplayMode !== 'race') {
                setDisplayMode('race')
            }
        } else {
            var laptime2 = "{ \"lap\": \"false\" }"
            var newjsondata2 = { ...jsondata, ...JSON.parse(laptime2) }
            //this.props.onLaneChange(jsondata.lane, newjsondata2)
            setJsonData(newjsondata2)

            if (jsondata.finishtime === "undefined" || !jsondata.finishtime) {
                if (DisplayMode !== 'startlist' && DisplayMode !== 'race') {
                    setDisplayMode('startlist')
                }
            } else {
                if (DisplayMode !== 'race') {
                    setDisplayMode('race')
                }
            }
        }
    }

    function setStartMode(startdelay: number) {
        var calcstartdelay = typeof (startdelay) != 'undefined' ? startdelay : 100
        console.log('startdelay ' + calcstartdelay)
        //if (this.state.DisplayMode === 'message' || this.state.DisplayMode === 'clock' || this.state.DisplayMode === 'video') {
        setDisplayMode('startlist')
        //}
        setStartdelayms(calcstartdelay)
    }

    function setRunningTimeString(time: any) {
        if (time.value === "undefined" || !time.value) {
            setRunningTime("0")
        } else {
            setRunningTime(time.value);
        }
    }

    function checkIncoming(jsondata: any, lanes: []) {
        //console.log(jsondata)
        var messageType = jsondata.type
        //console.log("message type: " + messageType)
        switch (messageType) {
            case "start": {
                setStartMode(jsondata.diff)
                break;
            }
            case "stop": {
                console.log('stop')
                setStartdelayms(-1);
                break;
            }
            case "header": {
                setHeaderInfo(jsondata);
                break;
            }
            case "lane": {
                setLaneInfo(jsondata, lanes)
                break;
            }
            case "clear": {
                //state.lanes = []
                //this.clearAll()
                //this.setDisplayMode("clear")
                console.log('clear')
                break;
            }
            case "startlist": {
                // ???
                if (DisplayMode !== 'startlist') {
                    setDisplayMode("startlist")
                    console.log('startlist')
                }
                break;
            }
            case "race": {
                // ???
                setDisplayMode("race")
                console.log('race')
                break;
            }
            case "clock": {
                // ???
                //this.setDisplayMode("clock")
                console.log('clock')
                break;
            }
            case "time": {
                setRunningTimeString(jsondata)
                console.log('running - time ' + jsondata.value)
                break;
            }
            case "message": {
                //this.setDisplayMode("message")
                //this.props.onMessageChange(jsondata)
                console.log('message')
                break;
            }
            case "lenex": {
                //this.setDisplayMode("message")
                //this.props.onMessageChange(jsondata)
                console.log('lenex')
                break;
            }
            case "video": {
                // ???
                //this.setDisplayMode("video")
                //this.props.onMessageChange(jsondata)
                console.log('video')
                break;
            }
            default: {
                console.log('default')
                console.log(jsondata.type)
                console.log(jsondata)
            }
        }
    }

    useEffect(() => {

        setConnectstate(model.connected)

        const messageListener = (message: any, lanes: []) => {
            //var jsondata = JSON.parse(message)
            //if (!connectstate) setConnectstate(true)
            checkIncoming(message, lanes)
        };
        messageListener(model.message, model.lanes);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [model.message, model.connected, model.lanes]);

    let connect_status = connectstate === true ? <SignalWifiStatusbar4BarIcon /> : <PortableWifiOffIcon />

    function getDataMapper() {
        if (connectstate) {
            return (<Grid item xs={12}>
                <DataMapper
                    CompetitionName={CompetitionName}
                    DisplayMode={DisplayMode}
                    jsonData={JsonData}
                    startdelayms={startdelayms}
                    runningtime={runningTime}
                    eventheat={eventheat}
                />
            </Grid>)
        } else {
            return (
                <div>
                    <Grid item  >
                        {connect_status}
                        <Typography>
                            Keine Verbindung zur Zeitnahme
                        </Typography>
                    </Grid>
                </div>)
        }
    }

    return (
        <div>
            {getDataMapper()}
        </div>
    );
}

export default WkAnalyseData;

function getIsLap(place: any): boolean {

    if (place === '0') {
        return true
    } else {
        return false
    }
}

function correctItem(jsondata: any): LaneState {

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
