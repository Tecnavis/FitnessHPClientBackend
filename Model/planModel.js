const mongoose = require('mongoose');
const planModel = new mongoose.Schema({
    name:{type:String, required:true},
    amount:{type:Number, required:true},
    duration:{type:Number, required:true},
    description:{type:String, required:true}
})

const planData = mongoose.model("planData", planModel)
module.exports = planData