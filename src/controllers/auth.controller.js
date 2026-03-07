const userModel = require('../models/user.model'); // user model ko import kiya, taki hum uska use kar sake, aur usme defined functions ko use kar sake.
const jwt = require('jsonwebtoken'); // jwt ko import kiya, taki hum uska use kar sake, aur usme defined functions ko use kar sake, jaise ki sign, verify, etc. 


/**
* - user register controller
* - POST - /api/auth/register
*/


async function userRegisterController(req, res){

    const { name, email, password } = req.body; // request body se name, email, password ko destructure kiya, taki hum unka use kar sake, aur unhe database me save kar sake.

    const isExists = await userModel.findOne({
        email: email
    })

    if(isExists){

        return res.status(420).json({
            message: "User already exists with this email, please try to login instead.",
            status: "failed"
        })
    }

    const user = await userModel.create({

        email, password, name
    })

    // user create hone ke baad, user ko aage login rakhne ke liye, (uske liye huma use jwt token dena hota hai)
    // hum ek token generate karenge, aur us token ko user ke response me bhejenge, taki user us token ko apne local storage me save kar sake, aur jab bhi user login kare to us token ko use karke apne aap ko authenticate kar sake.


     // now to create token, we will use jwt.sign() function, which takes three parameters, 
     // 1) is the payload, which is the data that we want to store in the token, 
     // 2) is the secret key, which is used to sign the token, it means that when we create a token, we will use this secret key to sign the token, and when we want to verify the token, we will use the same secret key to verify the token,
     // 3) is the options, which is used to set the expiration time of the token, etc.

     const token = jwt.sign( 
        { userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' } )

        // now token has been created, now we will set this token into cookies, so that user can use this token 
        // to authenticate himself in future requests.

// now we cave token in cookie.

    res.cookie("token", token) 
    // token ko cookie me set kar diya, taki user us token ko apne local storage me save kar sake, 
    // aur jab bhi user login kare to us token ko use karke apne aap ko authenticate kar sake.

    return res.status(201).json({    // why (201)?->bcoz whenever at endpoint we are creating a new resource on user's request- to status code 201 goes in.
        
        user:{
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    })

}

/**
 * - User login controller
 * - POST - /api/auth/login
 */
//  is controller me hum user ke email aur password ko check karenge, aur agar email aur password sahi hai to hum user ko ek token denge, taki user us token ko apne local storage me save kar sake, aur jab bhi user login kare to us token ko use karke apne aap ko authenticate kar sake.

async function userLoginController(req, res){

    const { email, password } = req.body; // request body se email aur password ko destructure kiya, taki hum unka use kar sake, aur unhe database me check kar sake.

    const user = await userModel.findOne({ email}).select("+password") 
    // email ke basis pe user ko database me find kiya, aur select("+password") ka matlab hai ki, hum password field ko bhi select
    // karna chahte hai, taki hum password ko compare kar sake, aur agar password match karta hai to user ko login kar sake.

    if(!user){
        return res.status(401).json({
            message: "email or password is invalid"
        })
    }

    // agar user mil jata hai, to hum password ko compare karenge, taki hum ye check kar sake ki user ne jo password diya hai, woh sahi hai ya nahi.

    const isValidPassword = await user.comparePassword(password) // user model me humne comparePassword naam ka ek method banaya hai, jisme hum password ko compare karenge, aur agar password match karta hai to true return karega, aur agar password match nahi karta hai to false return karega.

    if(!isValidPassword){
        return res.status(401).json({
            message: "email or password is invalid"
        })
    }

    // agar password bhi sahi hai, to hum user ko again ek token denge, taki user us token ko apne local storage me save kar sake, 
    // aur jab bhi user login kare to us token ko use karke apne aap ko authenticate kar sake.

    const token = jwt.sign(
        { userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' } )

        // now token has been created, now we will set this token into cookies, so that user can use this token 
        // to authenticate himself in future requests.

    res.cookie("token", token)
    // token ko cookie me set kar diya, taki user us token ko apne local storage me save kar sake, 
    // aur jab bhi user login kare to us token ko use karke apne aap ko authenticate kar sake.

    return res.status(200).json({  // res status will be 200, as we have done login, and not created a new user.
        user:{
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    })
}


module.exports = {
    userRegisterController,
    userLoginController
}