import {createRoot} from 'react-dom/client';
import WsConnect from './services/WsConnect';
import React from 'react';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
        <WsConnect />
);