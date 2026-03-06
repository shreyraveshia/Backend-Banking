// this will create instance of server & to config server( 
// means kon kon se middleware use kar rahe hai, kitne types ke hamare pass api's hone wale hai
// -ye saari ki saari cheez hum app.js mai kar rahe honge.)
const express = require('express');

const authRouter = require('./routes/auth.routes'); // auth.routes.js file se humne authRouter ko import kiya, taki hum apne application mai uska use kar sake, aur usme defined routes ko use kar sake.

const app = express(); // jo bhi server ka instance create hoga, woh app mai save ho jayega.


app.use("/api/auth", authRouter) // jab bhi koi request /api/auth se start hoti hai, to usse handle karne ke liye hum authRouter ka use karenge, jisme humne apne authentication se related routes define kiye honge, jaise ki register, login, logout, etc.









module.exports = app; // app ko export kar diya, taki server.js mai use kar sake.