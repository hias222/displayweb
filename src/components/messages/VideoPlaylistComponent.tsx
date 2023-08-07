import React, { useEffect, useState } from "react";

import classnames from 'classnames';
import { getFileList } from './utilities/getFileList'

export interface PlaylistInterface {
    resultdataURL: string;
}

var runningFile = ""

export default function MediaData() {

    const [mediaFiles, setMediaFiles] = useState([]);
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
        })
        // only once
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setPlayingFile(web_data_url + "/data/" + mediaFiles[numberFile])
        // eslint-disable-next-line
    }, [numberFile]);


    const handleChangeEnd = () => {
        var length = Object.keys(mediaFiles).length;
        var newNumber = numberFile + 1
        if (newNumber > length - 1) {
            setNumberFile(0)
            runningFile = (web_data_url + "/data/" + mediaFiles[numberFile])
        } else {
            setNumberFile(newNumber)
            runningFile = (web_data_url + "/data/" + mediaFiles[numberFile])
        }
    }

    let videotable = classnames('videotable-variable');

    function getVideoData() {
        //console.log("Video " + playingFile)
        return (
            < video className={videotable}
                onEnded={handleChangeEnd}
                loop={false}
                height={"100%"}
                width={"100%"}
                src={playingFile}
                autoPlay={true}
            />
        )
    }

    function getEmptyData() {
        console.log("Empty " + playingFile)
        setTimeout(() => {
            handleChangeEnd()
        }, 1000)
        return (
            <div></div>
        )
    }

    function getImageData() {
        //5s warten 
        if( playingFile.localeCompare(runningFile)){
            console.log("Image wait 5s")
            setTimeout(() => {
                handleChangeEnd()
            }, 5000)
        }

        //console.log("image " + playingFile)

        return (
            <img
                width={"100%"}
                height={"100%"}
                src={playingFile}
                alt={playingFile} />
        )
    }

    function getMediaFile() {
        if (playingFile !== undefined) {

            var extension = playingFile.substring(playingFile.lastIndexOf('.') + 1, playingFile.length) || playingFile;

            switch (extension.toLowerCase()) {
                case "mp4":
                    return getVideoData()
                case "ogg":
                    return getVideoData()
                case "webm":
                    return getVideoData()
                case "jpg":
                    return getImageData()
                case "gif":
                    return getImageData()
                case "png":
                    return getImageData()
                default:
                    return getEmptyData()
            }

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

