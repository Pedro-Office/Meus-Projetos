const products = require('../../models/stupid-db.json').products
exports.create = function(event, obj){
    products.push(obj)
    return true
}
exports.show = function(event, obj){
   console.log(products)
   return products;
}