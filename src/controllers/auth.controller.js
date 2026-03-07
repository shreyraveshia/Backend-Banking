const userModel = require('../models/user.model'); // user model ko import kiya, taki hum uska use kar sake, aur usme defined functions ko use kar sake.
const jwt = require('jsonwebtoken'); // jwt ko import kiya, taki hum uska use kar sake, aur usme defined functions ko use kar sake, jaise ki sign, verify, etc. 


/**
* -user register controller
* -POST - /api/auth/register
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

module.exports = {
    userRegisterController
}