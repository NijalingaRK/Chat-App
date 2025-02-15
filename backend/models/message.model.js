import mongoose from "mongoose";

 const messageSchema =new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
       type:String,
       required:true  
    }
    //createdAt: This field stores the date and time when the document was initially created.
    //updatedAt: This field stores the date and time when the document was last updated.
    
 },{timestamps:true});// it is a convenient way to automatically keep track of when a document was created and last modified without additional manual effort.

 const Message = mongoose.model("Message", messageSchema);
 export default Message;