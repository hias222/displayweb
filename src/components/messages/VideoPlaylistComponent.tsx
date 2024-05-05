import React, { useEffect, useState } from "react";

import classnames from 'classnames';
import { getFileList } from './utilities/getFileList'


export interface PlaylistInterface {
    resultdataURL: string;
}

var runningFile = ""

export default function MediaData(model: { height: string, width: string }) {

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
        console.log("Video " + playingFile + " width " + model.width + " " + model.height)
        return (
            < video className={videotable}
                onEnded={handleChangeEnd}
                loop={false}
                width={model.width}
                height={model.height}
                src={playingFile}
                autoPlay={true}
            />
        )
    }

    function getEmptyData() {
        console.log("Empty please check backend - " + playingFile + " width " + model.width + " " + model.height)
        console.log(web_data_url)
        setTimeout(() => {
            handleChangeEnd()
        }, 1000)
        return (
            <div></div>
        )
    }

    function getImageData() {
        //5s warten 
        if (playingFile.localeCompare(runningFile)) {
            console.log("Image wait 5s " + playingFile + " width " + model.width + " " + model.height)
            setTimeout(() => {
                handleChangeEnd()
            }, 5000)
        }

        return (
            <img
                width={model.width}
                height={model.height}
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

