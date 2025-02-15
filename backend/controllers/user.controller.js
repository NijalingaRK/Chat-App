
import User from '../models/user.model.js'
export const getUserForSidebar = async (req,res)=>{
    try {
    // Get the logged-in user’s ID from the request object
        const loggedInUserId = req.user_id;

    // Find all users in the database except the logged-in user

    // if you want to messsage userself you just write const allUsers= await User.find({})
        const filteredUsers= await User.find({_id:{$ne: loggedInUserId}}).select("-passsword");
        
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUserForSidebar:",error.message)
      res.status(500).json({error:"Internal server error"});
    }
}