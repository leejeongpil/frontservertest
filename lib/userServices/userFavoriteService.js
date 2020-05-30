var db = require('../mongoCollections')

module.exports = {
    addRestaurantToFavoriteList: function(req, res){
        return req.body
    },
    getFavoriteList: function (req, res) {
        return {"getFavoriteList":"getFavoriteList"}
    },
    deleteRestaurantInFavoriteList: function (req, res) {
        return req.body
    }
}