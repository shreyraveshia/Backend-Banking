// server start yaha hoga.

require("dotenv").config()
const app = require('./src/app'); // app.js se server ka instance le aao.

const connectoDB = require('./src/config/db'); // db se connect hone ke liye function le aao.

connectoDB() // db se connect hone ke liye function ko call kar diya. 

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}); // server ko 3000 port pe listen karne ke liye bol diya.