import { useEffect, useState } from 'react';
import { eventHeat } from '../types/EventHeat';
import getSwimStyles from '../utilities/getSwimStyles';
import DataMapper from './DataMapper';

import classnames from 'classnames';

import SignalWifiStatusbar4BarIcon from '@mui/icons-material/SignalWifi4Bar';
import PortableWifiOffIcon from '@mui/icons-material/PortableWifiOff';
import { Grid, Typography } from '@mui/material';
import React from 'react';
import { LaneState } from "../state/LaneState";
import { correctItem, correctDisplaymode } from '../utilities/checkLaneData';
import { TextMessageType } from '../types/TextMessageType';
import { HiitState } from '../state/HiitState';

//REACT_APP_ROUND_LENGTH
var ROUND_LENGTH =
    process.env.REACT_APP_ROUND_LENGTH === undefined
        ? "33"
        : process.env.REACT_APP_ROUND_LENGTH;

var HIIT_LANE =
    process.env.REACT_APP_HIIT_LANE === undefined ? 1 : process.env.REACT_APP_HIIT_LANE

function WkAnalyseData(model: { message: string, connected: boolean, lanes: [], header: string }) {

    const [connectstate, setConnectstate] = useState<boolean>(false)
    const [DisplayMode, setDisplayMode] = useState<string>('');
    const [Result, setResult] = useState<string>('');
    const [CompetitionName, setCompetitionName] = useState('')
    const [JsonData, setJsonData] = useState('');
    const [Jsonlanes, setJsonLanes] = useState<LaneState[] | []>([])
    const [startdelayms, setStartdelayms] = useState<number>(0);
    const [Round, setRound] = useState<number>(0);
    const [runningTime, setRunningTime] = useState('0');
    const [eventheat, setEventHeat] = useState<eventHeat>({
        eventnr: '0',
        heatnr: '0',
        name: '0',
    });
    const [hiit, setHiit] = useState<HiitState>({
        mode: 'data',
        event: 'config',
        departure: '120',
        gap: '5',
        varianz: '1',
        rows: []
    });

    const [textMessage, setTextmessage] = useState<TextMessageType>({
        diplayMode: '',
        displayFormat: '',
        MessageText: '',
        MessageTime: '',
        VideoVersion: '',
    })

    function setRoundValue(round: string) {
        try {
            var roundNumber = parseInt(round)
            var roundLength = parseInt(ROUND_LENGTH)
            var distancelength = parseInt(eventheat.distance !== undefined ? eventheat.distance : "50")
            console.log('Round ' + round + " " + eventheat.distance + "( " + roundLength+ " )")
       
            if (roundNumber * roundLength > distancelength) {
                setRound(distancelength)
            } else {
                setRound(roundNumber * roundLength)
            }
        } catch {
            return 0
        }

    }

    function setHiitData(hiit: any) {
        setHiit({ mode: hiit.mode, event: hiit.event, departure: hiit.departure, gap: hiit.gap, varianz: hiit.varianz, rows: hiit.rows })
    }

    function resetHeaderInfo() {

        setStartdelayms(-1);
        let newLanes: LaneState[] = [];
        setJsonLanes(newLanes);
        setJsonData('')

        setEventHeat(
            {
                name: '',
                eventnr: '0',
                heatnr: '0',
                competition: CompetitionName,
                distance: '0',
                gender: '0',
                relaycount: '0',
                round: '0',
                swimstyle: '0'
            })
    }

    function setHeaderInfo(jsondata: any) {
        // if header info -> switch to mode Startlist
        if (DisplayMode !== 'race') {
            setDisplayMode('startlist')
        }

        if (jsondata.heat !== eventheat.heatnr || jsondata.event !== eventheat.eventnr) {

            var eventNameCheck = jsondata.distance || jsondata.swimstyle ? jsondata.distance + "m " + getSwimStyles(jsondata.swimstyle) : ""
            var swimstyle = eventNameCheck
            //var swimstyle = (typeof (jsondata.name) !== "undefined" && jsondata.name)
            //    ? jsondata.name : jsondata.distance + "m " + getSwimStyles(jsondata.swimstyle)

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

            // test no switch startlist
            // ToDo check
            setDisplayMode('startlist')

            setJsonData(jsondata)
            setCompetitionName(jsondata.competition)
            console.log('WSAnaylseData ------> Heat' + jsondata.heat)
        } else {
            console.log("header no event or heat change - Displaymode " + DisplayMode)
        }
    }

    async function setLaneInfo(jsondata: any, lanes: []) {

        let newLanes: LaneState[] = [];
        let newDisplayMode: string = DisplayMode;
        await Promise.all(
            lanes.map(async (item, index) => {
                newLanes.push(correctItem(item, Jsonlanes[index]))
                newDisplayMode = (correctDisplaymode(item, newDisplayMode, eventheat))
                setDisplayMode(newDisplayMode)
                return
                //console.log('mode found ' + newDisplayMode)
            })
        )
        setJsonLanes(newLanes);

        //console.log(jsondata)
        // needed for push - BUG
        setJsonData(jsondata)
    }

    function setStartMode(startdelay: number) {
        var calcstartdelay = typeof (startdelay) != 'undefined' ? startdelay : 100
        console.log('startdelay ' + calcstartdelay)
        //if (this.state.DisplayMode === 'message' || this.state.DisplayMode === 'clock' || this.state.DisplayMode === 'video') {
        //setDisplayMode('startlist')
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

    function setMessageChange(message: any) {
        //console.log(message)
        var newMessage: TextMessageType = {
            diplayMode: message.type !== undefined ? message.type : '',
            displayFormat: message.size !== undefined ? message.size : '',
            MessageText: message.value !== undefined ? message.value : '',
            MessageTime: message.time !== undefined ? message.time : Date.now().toString(),
            VideoVersion: message.version !== undefined ? message.version : '',
        }

        // wird die Zeit aktualisiert
        if (message.type === 'time') {
            if (DisplayMode === 'clear' || DisplayMode === 'race' || DisplayMode === 'startlist') {
               // console.log("save message " + DisplayMode + " --> " + message.type)
                setTextmessage(newMessage)
            }
        } else {
            setTextmessage(newMessage)
        }
    }

    function checkIncoming(jsondata: any, lanes: []) {
        //console.log(jsondata)
        var messageType = jsondata.type
        setMessageChange(jsondata)
        //console.log("message type: " + messageType)
        switch (messageType) {
            case "start": {
                setStartMode(jsondata.diff)
                // reset Round
                setRound(0)
                break;
            }
            case "stop": {
                console.log('stop')
                setStartdelayms(-1);
                // reset Round
                setRound(0)
                break;
            }
            case "header": {
                //setHeaderInfo(jsondata);
                //not needed over useEffect
                break;
            }
            case "lane": {
                // not needed useEffect
                //setLaneInfo(jsondata, lanes)
                break;
            }
            case "clear": {
                // reset Round
                setRound(0)
                //state.lanes = []
                //this.clearAll()
                setDisplayMode("clear")
                console.log('clear')
                break;
            }
            case "startlist": {
                // reset Round
                setRound(0)
                // ???
                if (DisplayMode !== 'startlist') {
                    setDisplayMode("startlist")
                    setMessageChange(jsondata)
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
                setDisplayMode("clock")
                resetHeaderInfo()
                console.log('clock')
                break;
            }
            case "time": {
                setRunningTimeString(jsondata)
                //console.log('--> running - time ' + jsondata.value)
                break;
            }
            case "message": {
                resetHeaderInfo()
                setDisplayMode("message")
                console.log('->message')
                break;
            }
            case "hiit": {
                if (jsondata.lane !== undefined) {
                    console.log('->hiit ' + HIIT_LANE + " " + jsondata.lane)
                    if (HIIT_LANE.toString() === jsondata.lane.toString()) {
                        resetHeaderInfo()
                        setDisplayMode("hiit")
                        setHiitData(jsondata)
                    } else {
                        console.log("other lane")
                    }
                }

                break;
            }
            case "lenex": {
                resetHeaderInfo()
                setDisplayMode("message")
                console.log('--> lenex')
                break;
            }
            case "result": {
                setDisplayMode("result")
                setResult(jsondata)
                console.log('--> result')
                break;
            }
            case "video": {
                resetHeaderInfo()
                setDisplayMode("video")
                setMessageChange(jsondata)
                console.log('--> video')
                break;
            }
            case "round": {
                setRoundValue(jsondata.value)
                console.log('--> round')
                break;
            }
            case "presentlane": {
                setDisplayMode("lane" + jsondata.value)
                console.log('--> presentlane ' + jsondata.value)
                break;
            }
            case "best3": {
                setDisplayMode("best3")
                console.log('--> best3')
                break;
            }

            default: {
                console.log('case default type ' + JSON.stringify(jsondata))
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
    }, [model.message, model.connected]);

    useEffect(() => {
        setHeaderInfo(model.header);
        console.log("--> model.header")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [model.header]);

    useEffect(() => {
        setLaneInfo(model.message, model.lanes)
        //console.log('lane update')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(model.lanes)]);

    let connect_status = connectstate === true ? <SignalWifiStatusbar4BarIcon /> : <PortableWifiOffIcon />

    function getDataMapper() {
        if (connectstate) {
            return (<>
                <DataMapper
                    CompetitionName={CompetitionName}
                    DisplayMode={DisplayMode}
                    jsonData={JsonData}
                    startdelayms={startdelayms}
                    runningtime={runningTime}
                    eventheat={eventheat}
                    Jsonlanes={Jsonlanes}
                    TextMessage={textMessage}
                    Result={Result}
                    Round={Round}
                    Hiit={hiit}
                />
            </>)
        } else {
            let messagetext_main = classnames('messagetext_main');

            return (
                <Grid item  >
                    {connect_status}
                    <Typography className={messagetext_main}>
                        Keine Verbindung zur Zeitnahme
                    </Typography>
                </Grid>
            )

        }
    }

    return (
        <div>
            {getDataMapper()}
        </div>
    );
}

export default WkAnalyseData;
