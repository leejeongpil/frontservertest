var db = require('../mongoCollections')
var Restaurant_DB = db.collection_restaurant()
var Boss_DB = db.collection_boss()

module.exports = {
    getRestaurantList: function(req, res){
        //boss_id로 restaurantidList를 조회
        Boss_DB.findById(req.query.boss_id, function(err, boss){
            if (err) res.send(err)
            res.json(boss.restaurantidList)
        })
    },
    getRestaurantByIndex: function(req, res){
        //restaurantidList의 인덱스 값으로 restaurant를 조회
        Boss_DB.findById(req.query.boss_id, function(err, boss){
            if (err) res.send(err)
            Restaurant_DB.findById(boss.restaurantidList[req.query.index], function(err2, restaurant){
                if (err2) res.send(err2)
                res.json(restaurant)
            })
        })
    },
    createRestaurant: function (req, res) {
        var newRestaurant = new Restaurant_DB({
            title: req.body.title, type: req.body.type,
            description: req.body.description, 
            address: req.body.address,
            location : {
                coordinates : [req.body.lat, req.body.lng]
            },
            phone: req.body.phone,
            picture: req.body.picture,  //createPicture로 !
            originMenuList: [],
            menuidList: [], paidTicketidList: [],
            certifiedTicketidList: [], reviewidList: [],
            favoriteUseridList: [],
        });
        newRestaurant.save(function(err2, restaurant){
            if (err2) res.send(err2)
            Boss_DB.findById(req.body.boss_id, function(err3, boss){
                if (err3) res.send(err3)
                boss.restaurantidList.push(restaurant._id)
                boss.save(function(err4, updatedBoss){
                    if (err4) res.send(err4)
                    res.json(restaurant)
                })
            })
        })
    },
    updateRestaurant: function(req, res){
        return req.body
    },
    deleteRestaurant: function (req, res) {
        return req.body
    }
}
