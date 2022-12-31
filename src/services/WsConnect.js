import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client'
import WkAnalyseData from '../live/services/WsAnalyseData';

import '../styles/App.scss';

/*
this.state = {
  WsConnected: false,
  HeatNumber: 0,
  EventNumber: 0,
  CompetitionName: 'new',
  DisplayMode: 'race'
}
*/
function WsConnect() {

  var context_path = process.env.REACT_APP_BACKEND_CONTEX_PATH === undefined ? "/ws2/socket.io" : "/" + process.env.REACT_APP_BACKEND_CONTEX_PATH + "/socket.io"
  var get_backend_port = process.env.REACT_APP_BACKEND_PORT === undefined ? "4001" : process.env.REACT_APP_BACKEND_PORT
  var get_backend_url = process.env.REACT_APP_BACKEND_DIRECT === "true" ? window.location.protocol + "//" + window.location.hostname + ":" + window.location.port : process.env.REACT_APP_BACKEND_URL
  var backend_url = get_backend_url === undefined ? window.location.protocol + "//" + window.location.hostname + ":" + get_backend_port : get_backend_url
  /*
  function printEnvironment() {
    console.log('context_path: ' + context_path + ' (REACT_APP_BACKEND_CONTEX_PATH)')
    console.log('get_backend_port: ' + get_backend_port + ' (REACT_APP_BACKEND_PORT)')
    console.log('get_backend_url: ' + get_backend_url + ' (REACT_APP_BACKEND_DIRECT true/false)')
    console.log('backend_url: ' + backend_url + ' (REACT_APP_BACKEND_URL when false)')
  }


  function sayHello() {
    printEnvironment()
  }

  function connectWS() {
    console.log('connect')
  }

  function disconnectWS() {
    console.log('disconnect')
  }
  */

  const [message, setMessage] = useState('');
  const [connected, setConnected] = useState(false);

  useEffect(() => {

    console.log(backend_url + ' Context ' + context_path)
    const newSocket = socketIOClient(backend_url, {
      path: context_path
    });

    const messageListener = (newmessage) => {
      var jsondata = JSON.parse(newmessage)
      setMessage(jsondata)
    };

    newSocket.on('FromAPI', messageListener);

    newSocket.on('connect', () => {
      setConnected(true)
      console.log('WsSocketState: connected ' + backend_url + context_path);
    });

    newSocket.on('disconnect', () => {
      setConnected(false)
      console.log('WsSocketState: disconnected ' + backend_url + context_path);
    });

    newSocket.io.on('error', (error) => {
      setConnected(false)
      console.log("WsSocketState: error socket-io " + backend_url + context_path);
      console.log(error)
    });


    return () => {
      newSocket.close()
      setConnected(false)
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>

      <div className="chat-container">
        <WkAnalyseData message={message} connected={connected} />
      </div>

      {/*
      <button onClick={sayHello}>Log</button>
      <button onClick={connectWS}>Connect</button>
      <button onClick={disconnectWS}>DISConnect</button>
      */}
    </div>
  );
}

export default WsConnect;