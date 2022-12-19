import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    channel : String,
    author : String,
    content : String,
    timeStamp : {type:Date,default: Date.now}
});
 
/**
 *  channel : 채널번호
 * 
 *  author : 발언자
 * 
 *  content : 내용
 */
export default mongoose.model("chat",chatSchema)