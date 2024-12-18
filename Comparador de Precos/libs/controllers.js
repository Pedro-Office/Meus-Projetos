'use strict'

var {ipcMain} = require('electron')
var fs = require('fs')
var path = require('path')

//função importa todos os arquivos dentro de controllers
//ela é executada assim que a janela é criada
//quando executada, ela verifica a pasta controllers e se
//tiver pastas, vai atribuir o nome delas ao nome do controller
//dentro das pastas, irá pegar os index.js e verificar os
//objetos (exportados com exports.<objetos>), o nome do objeto
//é o nome da função que será atribuida ao IPC

//exemplo, um controller dentro da pasta "Products" exportando o 
//objeto "create" terá o nome de products:create lá no preload.js

//ipc recebe ipcMain, options é uma interface para adicionarmos funções de debug e etc
module.exports = function (ipc, options) {
    //verifica a pasta controllers
    var dir = path.join(__dirname, '..', 'controllers');
    var debug = options.debug
    //lê a pasta controllers
    fs.readdirSync(dir).forEach(function(name) {
        //salva o destino das pastas em file
        var file = path.join(dir, name)
        //se não for um diretorio, retorna nada
        if(!fs.statSync(file).isDirectory()){
            return;
        }
        //requere o arquivo e salva as funções e objetos em obj
        var obj = require(file)
        //como diria mikey mouse, é uma ferramenta 
        //que usaremos mais tarde
        var handler;
        //metodo padrão de comunicação do IPC (padrão handle)
        var method = 'handle'; //valor default
        
        for(var key in obj){
            //switch(key){
            //    case 'create':
            //        method = 'handle'
            //        break;
            //}
            var handler = obj[key]
            var method = obj[key].method || method;
            key = obj[key].key || key

            
            if(debug){console.log(`\n${name}:${key}`)}
            ipc[method](`${name}:${key}`, handler)

        }

    })
}