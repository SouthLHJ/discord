import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    email : {type : String, unique : true},
    pw : {type : String, required : true},
    name : {type : String, required : true},
    birth : String,
    avatar : String,
    socketId : String,
    createdAt : {type:Date,default: Date.now}
});
 
export default mongoose.model("account",accountSchema)