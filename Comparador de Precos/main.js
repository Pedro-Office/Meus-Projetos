const { app, BrowserWindow, ipcRenderer, ipcMain } = require('electron')
const path = require('node:path')

//função que cria a janela
const createWindow = () => {
  //aqui vai os parametros da janela, tal como
  //largura, altura, scripts carregados, entre outros
  const win = new BrowserWindow({
    width: 800,
    webPreferences:{
      //usado como ponte entre o main.js e o renderer.js
      //no main se usa a função ipcMain.<função> e no 
      //renderer a ipcRenderer.<função>
        preload:path.join(__dirname, 'libs', 'preload.js')
    },
    height: 600
  })
//carergando arquivo views/index.html
  win.loadFile(path.join(__dirname, 'views','index.html'))
}
//quando a pagina estiver pronta / carregada, então:
app.whenReady().then(() => {
//o ipcMain cria uma Ponte (ou "braço") da função ping, 
//e executa a função anonima que imprime a mensagem "pong"
  //ipcMain.handle('ping', () => {console.log('pong')})

  require('./libs/controllers.js')(ipcMain, {debug : true})

  //cria a janela
  createWindow()
  //quando o app estiver ativo
  app.on('activate', () => {
    //se o tamanho da array de todas as janelas for igual a 0,
    //então não existe janela aberta e deve-se criar uma
    //acredito que se quiser usar o aplicativo em segundo plano
    //se remove esse if e inicia direto a janela

    //ou talvez isso seja uma grande gambiarra
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
//compatibilidade com o mac (se n me engano)
//quando todas as janelas forem fechadas
app.on('window-all-closed', () => {
  //e a plataforma for diferente de darwin
  //então quita
  if (process.platform !== 'darwin') app.quit()
})