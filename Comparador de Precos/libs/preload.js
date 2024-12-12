const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld('app', {
    ping: () => {ipcRenderer.invoke('ping')}
})