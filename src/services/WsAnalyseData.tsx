import { useEffect, useState } from 'react';
import { eventHeat } from '../../shared/types/EventHeat';
import getSwimStyles from '../utilities/getSwimStyles';
import DataMapper from './DataMapper';

import SignalWifiStatusbar4BarIcon from '@mui/icons-material/SignalWifiStatusbar4Bar';
import PortableWifiOffIcon from '@mui/icons-material/PortableWifiOff';
import { Grid, Typography } from '@mui/material';

/*
 this.state = {
      WsConnected: false,
      HeatNumber: 0,
      EventNumber: 0,
      CompetitionName: 'new',
      DisplayMode: 'race'
    }
    */

function WkAnalyseData(model: { message: string, connected: boolean }) {

    const [connectstate, setConnectstate] = useState<boolean>(false)
    const [DisplayMode, setDisplayMode] = useState('');
    const [CompetitionName, setCompetitionName] = useState('')
    const [JsonData, setJsonData] = useState('');
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

    function setLaneInfo(jsondata: any) {
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

    function checkIncoming(jsondata: any) {
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
                setLaneInfo(jsondata)
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

        const messageListener = (message: any) => {
            //var jsondata = JSON.parse(message)
            //if (!connectstate) setConnectstate(true)
            checkIncoming(message)
        };
        messageListener(model.message);
        /*
                return () => {
                    console.log('finish WSanalyse')
                };
                */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [model.message, model.connected]);

    let connect_status = connectstate === true ? <SignalWifiStatusbar4BarIcon /> : <PortableWifiOffIcon />
    var document_title = process.env.REACT_APP_SITE_TITLE === undefined ? "Timing" : process.env.REACT_APP_SITE_TITLE

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
                        <Typography sx={{ mb: 1.0 }} color="text.primary" gutterBottom align="center">
                            Keine Verbindung zur Zeitnahme
                        </Typography>
                    </Grid>
                    {/*
                    <DataMapper
                        CompetitionName={CompetitionName}
                        DisplayMode={DisplayMode}
                        jsonData={JsonData}
                        startdelayms={startdelayms}
                        runningtime={runningTime}
                        eventheat={eventheat}
                    />
            */}
                </div>)
        }
    }

    return (
        <Grid container justifyContent="center">
            <Grid item xs={10} display="flex" justifyContent={'center'}>
                <Typography variant="h6" component="div" gutterBottom align="center">
                    {document_title}
                </Typography>
            </Grid>
            <Grid item xs={2} display="flex" justifyContent={'flex-end'}>
                {connect_status}
            </Grid>
            {getDataMapper()}
        </Grid>

    );
}

export default WkAnalyseData;