require('dotenv').config();
const nodemailer = require('nodemailer');

// the work of transporter is such that -

// jo google ka server hota hai jo email send karta hain-> yes jo email ko handle/send karte hain
//  woh alag server hota hain and we call it SMTP Servers(they are made specifically for sending 
// emails). To google ke apne bohot sare servers hain and un servers se interact karne ke liye 
// we need to create transporter. lekin SMTP server free mai aise hi koi bhi use nahi kar sakta 
// as wo open nahi hote hain, to un SMTP servers se contact karn ke liye bas we need these things
// " clientId: process.env.CLIENT_ID, clientSecret: process.env.CLIENT_SECRET, refreshToken: process.env.REFRESH_TOKEN " bcoz wo jo SMTP server hai hamare unse (ye jo hum server create kar rahe hai express ki help se- woh hamare behalf pe contact karta hain un SMTP server se)- iski wajah se we here create transpporters- jo smtp server se communicate karta hain

// now jab bhi our server wants to send any email to any email address,-> then hamara server transporter ka use karts hain-> SMTP server se communicate karne ke liye-> and then it will happen 

// and ye saare credentials hume google cloud console se milenge, jaha pe hum apna project create
//  karenge, aur us project ke andar hum credentials create karenge, aur us credentials ke andar 
// hume ye saare details milenge, jise hum apne transporter me use karenge, taki hum google ke 
// SMTP server se connect kar sake, aur uske through hi hum email send kar sake."


// hain woh alag server hota hain jo ki google ka hota hain, aur hum us server se connect karte 
// hain, aur us server ke through hi hum email send karte hain, to us server se connect hone ke 
// liye hume transporter ki zarurat hoti hain, aur nodemailer hume transporter provide karta 
// hain, jiske through hum google ke email server se connect kar sakte hain, aur uske through 
// hi hum email send kar sakte hain.

// 



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend Ledger" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};



module.exports = sendEmail;