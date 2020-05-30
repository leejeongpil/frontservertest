var db = require('../mongoCollections')
var Menu_DB = db.collection_menu()
var Restaurant_DB = db.collection_restaurant()

module.exports = {
    getMenuBySearchBar: function(req, res){
        return {"getMenuBySearchBar":"getMenuBySearchBar"}
    },
    getMenuByCategory: function (req, res) {
        return {"getMenuByCategory":"getMenuByCategory"}
    },
    getMenuByTime: function(req, res){
        //FE : uesrid(주소정보 받아옴), 
        return {"getMenuByTime":"getMenuByTime"}
    },
    getMenuListOfRestaurant: function(req, res){
        Restaurant_DB.findById(req.query.restaurant_id, (err, restaurant)=>{
            Menu_DB.find({
                '_id': { $in: restaurant.menuidList }
            }, function(err, menuList){
                 res.json(menuList);
            });
        })
    },
    getRestaurantBySearchBar: function(req, res){
        return {"getRestaurantBySearchBar":"getRestaurantBySearchBar"}
    },
    getRestaurantByCategory: function(req, res){
        return {"getRestaurantByCategory":"getRestaurantByCategory"}
    },
    getRestaurantDetail: function(req, res){
        //아마 없어질듯
        return {"getRestaurantDetail":"getRestaurantDetail"}
    },
}
