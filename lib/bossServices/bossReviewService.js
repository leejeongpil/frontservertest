var db = require('../mongoCollections')

module.exports = {
    getReviewList: function(req, res){
        return {"getReviewList":"getReviewList"}
    },
    createReply: function (req, res) {
        return req.body
    },
    updateReply: function(req, res){
        return req.body
    },
    deleteReply: function (req, res) {
        return req.body
    }
}
