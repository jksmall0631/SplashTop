const electron = require('electron');
const ipc = electron.ipcRenderer;
const $ = require('jquery');
const $htmlView = $('.rendered-html');
import React from "react";

React.render(<div className="myDiv">Hello Electron!</div>, document.getElementById('content'));
