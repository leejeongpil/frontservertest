var db = require('../mongoCollections')
var OriginMenu_DB = db.collection_originMenu()
var Menu_DB = db.collection_menu()
var Restaurant_DB = db.collection_restaurant()

var schedule = require('node-schedule');

module.exports = {
    getMenuList: function(req, res){
        Restaurant_DB.findById(req.query.restaurant_id, (err, restaurant)=>{
            Menu_DB.find({
                '_id': { $in: restaurant.menuidList }
            }, function(err, menuList){
                res.json(menuList);
            });
        })
    },
    createMenu: function(req, res){
        OriginMenu_DB.findById(req.body.originMenu_id, function(err, originMenu){
            Restaurant_DB.findById(originMenu.restaurant_id, function(err2, restaurant){
                var newMenu = new Menu_DB({
                    originMenu : originMenu,
                    location : restaurant.location,
                    address : restaurant.address,
                    picture : req.body.picture,
                    discoutedPrice : req.body.discoutedPrice,
                    quantity : req.body.quantity,
                    start_hour : req.body.start_hour,
                    start_min : req.body.start_min,
                    end_hour : req.body.end_hour,
                    end_min : req.body.end_min,
                    method : req.body.method
                })
                newMenu.save(function(err3, menu){
                    restaurant.menuidList.push(menu._id)
                    restaurant.save(function(err4, updatedRestaurant){
                        //menu 시간 다 되면, 메뉴.alive / 가게 메뉴id리스트 업데이트
                        var today = new Date();
                        var month = today.getMonth() + 1;
                        var date = today.getDate();
                        var destroyJob = schedule.scheduleJob(
                            `* ${req.body.end_min} ${req.body.end_hour} ${date} ${month} *`, ()=>{
                            menu.alive = false
                            menu.save((err5)=>{
                                var idx = updatedRestaurant.menuidList.findIndex(function(item) {
                                    return item == String(menu._id)})
                                if (idx > -1) updatedRestaurant.menuidList.splice(idx, 1)
                                updatedRestaurant.save((err6)=>{
                                    destroyJob.cancel()
                                })
                            })
                        });   

                        res.json(menu)
                    })
                })
            })
        })
    },
    updateMenu: function(req, res){
        return req.body
    },
    deleteMenu: function (req, res) {
        return req.body
    }
}
