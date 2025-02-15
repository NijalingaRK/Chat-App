import { maxHeaderSize } from 'http'
import jwt from 'jsonwebtoken'//JWTs are a secure way to transmit information between 
                                 //two parties (usually a client and server) as a JSON object. 
const generateTokenAndSetCookie=(userId,res) =>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d'
    })
    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000, // 1 day expiration in milliseconds
        httpOnly:true, // Makes the cookie accessible only to the web server (not to JavaScript)
        sameSite:"strict",// Restricts the cookie to same-site requests
        secure:process.env.NODE_ENV !=="development"   
    });
} ;

export default generateTokenAndSetCookie;