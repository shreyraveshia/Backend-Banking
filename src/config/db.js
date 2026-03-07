const mongoose = require('mongoose');





function connecttoDB(){

    mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        console.log("Server is connected to DB.")
    })
    .catch(err=>{
        console.log("Error connecting to DB:", err.message)
        console.log("Full error:", err)
        process.exit(1) // 'process.exit(1)'-> means that agar server hamare db se connect nahi ho pata hai then,
                        // hum apne server ko yahi bandh kar denge. bcoz bina db ke server kuch kar hi nahi sakta as woh faltu mair resources ko consume karega.
    })
}

module.exports = connecttoDB