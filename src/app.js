// this will create instance of server & to config server( 
// means kon kon se middleware use kar rahe hai, and kitne types ke hamare pass api's hone wale hai
// -ye saari ki saari cheez hum app.js mai kar rahe honge.)

const express = require('express');
const cookieParser = require('cookie-parser'); // cookie-parser middleware ko import kiya, taki hum apne application mai cookies ko easily handle kar sake, aur request se cookies ko access kar sake.

const authRouter = require('./routes/auth.routes'); // auth.routes.js file se humne authRouter ko import kiya, taki hum apne application mai uska use kar sake, aur usme defined routes ko use kar sake.

const app = express(); // jo bhi server ka instance create hoga, woh app mai save ho jayega.

// express ka server cannot read data incoming by default, its not that capable- so we need to use a middleware to read the incoming data, and that middleware is express.json(), which will help us to read the incoming json data, and we can access that data in our request body.
app.use(express.json()) // express.json() middleware ko use karne ke liye bol diya, taki hum apne application mai json data ko easily handle kar sake, aur request body se json data ko access kar sake.

app.use(cookieParser()) // cookie-parser() middleware ko use karne ke liye bol diya, taki hum apne application mai cookies ko easily handle kar sake, aur request se cookies ko access kar sake.

app.use("/api/auth", authRouter) // jab bhi koi request /api/auth se start hoti hai, to usse handle karne ke liye hum authRouter ka use karenge, jisme humne apne authentication se related routes define kiye honge, jaise ki register, login, logout, etc.









module.exports = app; // app ko export kar diya, taki server.js mai use kar sake.