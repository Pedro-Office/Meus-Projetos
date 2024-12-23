//saiba mais sobre esse arquivo nesse link
//

const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld('app', {
    "products:create": (obj) => {return ipcRenderer.invoke('products:create',obj)},
    "products:show": async (obj) => {return await ipcRenderer.invoke('products:show')}
})