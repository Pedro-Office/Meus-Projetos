function func(obj) {
    window.app["products:create"](obj)
}
func({name:"produto novo", preco:"676"})

function func1() {
    window.app["products:show"]()
}
func1()
//as funções expostas no mundo principal no preload.js 
//são acessadas dentro do window.<apiKey>

