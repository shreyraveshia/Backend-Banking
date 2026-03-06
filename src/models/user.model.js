const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');
// bcryptjs is a library that helps us to hash our password, so that our user's password is secure in the database.


const userSchema = new mongoose.Schema({

    email:{
        type: String,
        required: [true, "Email is required for creating a user"], // if user trues to create without email-> to error jayega message ke roop mai
        trim: true, // agar user email ke aage ya peeche space de deta hai to woh automatically remove ho jayega.
        lowercaase: true, 
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/,
            "Invalid Email address" // if regex doesnt return true, then we will return this message as error.
        ],
        unique: [ true, "Email already exists."]
        // email ke andar jo bhi value aane vali hai, uske format ko check kare, ie validate kare
                  // The format user is giving us is correct or not.
                  // for it we need 'regex'.
                  // A regex only validates the email's format. 
                  // It cannot guarantee that the email address actually exists or is active.
                  
                  //A regular expression (shortened as regex or regexp), sometimes 
                  // referred to as a rational expression, is a sequence of characters that 
                  // specifies a match pattern in text.
    },

    name:{
        type: String,
        required: [ true, " Name is required for an account"]
    },
    password: {
        type: String,
        required: [true, "password is required for creating an account"],
        minlength: [6, " password should contain more than 6 characters"],
        select: false // what select does is this that, agar age jake db mai ya application mai kahi bhi, hum user ke data ko retrieve karte hai, to password by default nahi aayega kisi bhi query mai, unless hum specifically usko select karne ke liye bole.
    }
},
  {
    timestamps: true // ye hume user ka createdAt aur updatedAt dono fields dega,
                    // jisme createdAt mai hume pata chalega ki user kab create hua tha,
                    // aur updatedAt mai hume pata chalega ki user ka data kab update hua tha.
  })

  userSchema.pre('save', async function(next){ 
// pre ka matlab hai ki, jab bhi hum user ka data save karne wale hai, to usse pehle ye function chalega, aur is function ke andar hum password ko hash karenge, taki hamare user ka password secure rahe.

    if(!this.isModified("password")) // if password is not modified, then we will not hash the password again, and we will simply move to the next middleware or function.
    {
        return next()
    }

    const hash = await bcrypt.hash(this.password, 10) // this.password is the password that user has given us, and 10 is the number of rounds we want to use for hashing the password, the more rounds we use, the more secure our password will be, but it will also take more time to hash the password.
    this.password = hash // we are replacing the plain text password with the hashed password, so that our user's password is secure in the database.

    return next() // after hashing the password, we will move to the next middleware or function.
  
// password-----converted to hash------> then """""" saving hash as password in db """""", so that our user's password is secure in the database.

}) // pre ka matlab hai ki, jab bhi hum user ka data save karne wale hai, to usse pehle ye function chalega, aur is function ke andar hum password ko hash karenge, taki hamare user ka password secure rahe.

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password) // this.password is the hashed password that we have stored in the database, and password is the plain text password that user is giving us, and we are comparing them using bcrypt's compare function, which will return true if the passwords match, and false if they don't match.
}

const userModel = mongoose.model("User", userSchema) // userSchema se humne ek model create kiya, jiska naam User hai, aur usme humne userSchema ko pass kiya, taki hum apne application mai User model ka use karke user ke data ko create, read, update, delete kar sake.

module.exports = userModel // userModel ko export kar diya, taki hum apne application mai kahi bhi use kar sake.