var db = require('../mongoCollections')

//메뉴종료되면, 메뉴리스트에서 pop
module.exports = {
    addMenuToWishList: function(req, res){
        return req.body
    },
    getWishList: function(req, res){
        return {"getWishList":"getWishList"}
    },
    deleteMenuInWishList: function (req, res) {
        return req.body
    }
}
