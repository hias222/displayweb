import React, { useEffect, useState } from "react";

import classnames from 'classnames';
import { getFileList } from './utilities/getFileList'

export interface PlaylistInterface {
    resultdataURL: string;
}

export default function MediaData() {

    const [mediaFiles, setMediaFiles] = useState([]);
    const [isEnded, setIsEnded] = useState(false);
    const [playingFile, setPlayingFile] = useState("");
    const [numberFile, setNumberFile] = useState(0);

    let web_data_url =
        process.env.REACT_APP_WEB_DATA_URL === undefined
            ? window.location.protocol +
            "//" +
            window.location.hostname +
            ":" +
            window.location.port
            : process.env.REACT_APP_WEB_DATA_URL;



    useEffect(() => {
        getFileList().then((data) => {
            setMediaFiles(data)
            setNumberFile(0)
            if (data[0] !== undefined) setPlayingFile(web_data_url + "/data/" + data[0])
            setIsEnded(false)
        })

    }, []);

    useEffect(() => {
        console.log("end mp4 " + isEnded + " " + playingFile)
        var length = Object.keys(mediaFiles).length;
        var newNumber = numberFile + 1
        if (newNumber > length - 1) {
            setNumberFile(0)
            setPlayingFile(web_data_url + "/data/" + mediaFiles[0])
        } else {
            setNumberFile(newNumber)
            setPlayingFile(web_data_url + "/data/" + mediaFiles[newNumber])
        }
    }, [isEnded]);

    let videotable = classnames('videotable-variable');
    
    function getMediaFile(){
        console.log(playingFile)
        if (playingFile !== undefined) {
            return (
                < video className={videotable}
                onEnded={() => setIsEnded(true)}
                loop={true}
                height={"100%"}
                width={"100%"}
                src={playingFile}
                autoPlay={true}
            />
            )
        } else {
            return (
                <div></div>
            )
        }
    }
    
    return (
        getMediaFile()
    )
}

