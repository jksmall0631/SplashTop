const electron = require('electron');
const ipc = electron.ipcRenderer;
const $ = require('jquery');
const $markdownView = $('.raw-markdown');
const $htmlView = $('.rendered-html');
const $openFileButton = $('#open-file');
const $saveFileButton = $('#save-file');
const $copyHtmlButton = $('#copy-html');

ipc.on('file-opened', (event, file, content) => {
  $markdownView.text(content);
});
