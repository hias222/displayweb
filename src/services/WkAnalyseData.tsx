import { useEffect, useState } from 'react';
import { eventHeat } from '../types/EventHeat';
import getSwimStyles from '../utilities/getSwimStyles';
import DataMapper from './DataMapper';

import SignalWifiStatusbar4BarIcon from '@mui/icons-material/SignalWifi4Bar';
import PortableWifiOffIcon from '@mui/icons-material/PortableWifiOff';
import { Grid, Typography } from '@mui/material';
import React from 'react';
import { LaneState } from "../state/LaneState";
import { correctItem, correctDisplaymode } from '../utilities/checkLaneData';
import { TextMessageType } from '../types/TextMessageType';


function WkAnalyseData(model: { message: string, connected: boolean, lanes: [] }) {

    const [connectstate, setConnectstate] = useState<boolean>(false)
    const [DisplayMode, setDisplayMode] = useState<string>('');
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

    const [textMessage, setTextmessage] = useState<TextMessageType>({
        diplayMode: '',
        displayFormat: '',
        MessageText: '',
        MessageTime: '',
        VideoVersion: '',
    })

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

        let newLanes: LaneState[] = [];
        let newDisplayMode: string = DisplayMode;
        await Promise.all(
            lanes.map(async (item, index) => {
                newLanes.push(correctItem(item, Jsonlanes[index]))
                newDisplayMode = (correctDisplaymode(item, newDisplayMode))
                setDisplayMode(newDisplayMode)
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

        var newMessage: TextMessageType = {
            diplayMode: message.type !== undefined ? message.type : '',
            displayFormat: message.size !== undefined ? message.size : '',
            MessageText: message.value !== undefined ? message.value : '',
            MessageTime: message.time !== undefined ? message.time : Date.now().toString(),
            VideoVersion: message.version !== undefined ? message.version : '',
        }

        setTextmessage(newMessage)
 
    }

    function checkIncoming(jsondata: any, lanes: []) {
        //console.log(jsondata)
        var messageType = jsondata.type
        setMessageChange(jsondata)
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
                setDisplayMode("clear")
                console.log('clear')
                break;
            }
            case "startlist": {
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
                console.log('--> running - time ' + jsondata.value)
                break;
            }
            case "message": {
                resetHeaderInfo()
                setDisplayMode("message")
                console.log('->message')
                break;
            }
            case "lenex": {
                resetHeaderInfo()
                setDisplayMode("message")
                console.log('--> lenex')
                break;
            }
            case "video": {
                resetHeaderInfo()
                setDisplayMode("video")
                setMessageChange(jsondata)
                // ???
                //this.setDisplayMode("video")
                //this.props.onMessageChange(jsondata)
                console.log('--> video')
                break;
            }
            default: {
                console.log('case default type ' + jsondata)
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
                    Jsonlanes={Jsonlanes}
                    TextMessage={textMessage}
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
