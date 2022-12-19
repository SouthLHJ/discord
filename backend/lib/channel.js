import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    joiner : Array,
    createdAt : {type:Date,default: Date.now}
});
 
/**
 *  joiner : 참여자
 *  
 *  createdAt : 채널 생성 날짜
 */
export default mongoose.model("channel",channelSchema)