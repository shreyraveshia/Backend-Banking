// this will create instance of server & to config server( 
// means kon kon se middleware use kar rahe hai, kitne types ke hamare pass api's hone wale hai
// -ye saari ki saari cheez hum app.js mai kar rahe honge.)


const express = require('express');

const app = express(); // jo bhi server ka instance create hoga, woh app mai save ho jayega.

module.exports = app; // app ko export kar diya, taki server.js mai use kar sake.