import mongoose from "mongoose";


const relationshipSchema = new mongoose.Schema({
    since : {type : Date},
    type : Number,
    user1 : String,
    user2 : String,
    createdAt : Date,
});

/** type(user1기준) : { 0 : 보낸, 1 : 받은, 2 : 친구, 3 : 차단}
 * 
 *  user1Data / user2Data : populate
 */
export default mongoose.model("relationship",relationshipSchema)

relationshipSchema.virtual("user2Data",{
    localField : "user2",
    foreignField : "email",
    ref : "account"
})

relationshipSchema.virtual("user1Data",{
    localField : "user1",
    foreignField : "email",
    ref : "account"
})