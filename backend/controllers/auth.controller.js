import bcrypt from "bcryptjs" //bcryptjs is a popular Node.js library used for hashing passwords it is well-known for its resistance to brute-force attacks.
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        // Destructure properties from req.body
        const { fullName, username, password, confirmPassword, gender } = req.body;

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        // Check if user already exists
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        // HASH PASSWORD HERE (you should implement this) Hashing is a one-way process that takes a plain text input (in this case, the password) and converts it into a fixed-length string that cannot be reversed back to the original input.
       const salt = await bcrypt.genSalt(10);// // Generate a salt with 10 rounds (10 is a common choice) bigger number having higher security but slower
       // Hash the user's password with the generated salt
       const hashedPassword = await bcrypt.hash(password, salt);

       // Generate profile picture URL based on gender
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Create new user
        const newUser = new User({
            fullName,
            username,
            password:hashedPassword, // Ensure you hash the password before saving
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });
        if (newUser){
         // Generate JWT token here
         generateTokenAndSetCookie (newUser._id, res)  
        // Save new user to the database
        await newUser.save();

        // Send response with user details (excluding password)
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
        });
    }else{
        res.status(400).json({error:"Invalid User Data"})
    }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Other controllers
export const login =async (req, res) => {
    try{
        const {username,password}=req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
    if (!user || !isPasswordCorrect) {
        return res.status(400).json({error:"Invalid username or password"})
    }   

    generateTokenAndSetCookie(user._id,res);

    res.status(200).json({
        _id:user._id,
        fullName:user.fullName,
        username:user.username,
        profilePic: user.profilePic,
    });

    }catch(error){
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });

    }
    
};

export const logout =(req, res) => {
   try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({ message: "logged out successfully" });
   } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
   }
};
