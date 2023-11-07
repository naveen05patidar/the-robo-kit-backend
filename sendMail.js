const nodemailer = require("nodemailer");
const express = require('express');
const userSchema = require('./Modal/userModal');

const senMail = async (req, res) => {
  const receiverId = req.body.receiverId;
  const sub = req.body.sub;
  const text = req.body.text;

  const otp = Math.floor(100000 + Math.random() * 900000);

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "naveen05patidar@gmail.com",
      pass: "ejer alxk rilp vcng",
    },
  });

  try {
    const info = await transporter.sendMail({
      from: "naveen05patidar@gmail.com", //'"Naveen Patidar"
      to: `${receiverId}`, // list of receivers
      subject: `${sub}`, // Subject line
      text: `${text}`, // plain text body
      html: `your otp is <b>${otp}</b>`, // html body
    });
    const dataSchema = await userSchema.findOne({ email: receiverId }); // Use findOne instead of findById
    if (info.accepted.length > 0) {
      const date = new Date();
      const returnDate = date.setMinutes(date.getMinutes() + 5);
      const data = {
        email:receiverId,
        otp:otp,
        expire:returnDate,
        createdDate:`${date.getDay()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`
      }
     if(!dataSchema){
      let user = await new userSchema(data);
      user.save().then((result)=>{
         res.status(200).json({success:true,message:"otp sended to your mail, please check your email id "});
      }).catch((err)=>{
        res.status(500).json({success:false,msg:"Mail not sended due"})
      })
     }else{
      const data = {
        otp: otp,
        expire: returnDate,
      }
      const updateData = await userSchema.findOneAndUpdate({ email: receiverId }, data);
      if (updateData) {
        res.status(200).json({ success: true, message: "otp sended to your mail, please check your email id and updated" });
      } else {
        res.status(500).json({ success: false, msg: "Mail not sended due" });
      }
     }
    }else{
      res.status(400).json({success:false,msg:"please check your mail id"})
    }
  } catch (error) {
  console.error(error);
  res.status(500).json({ success: false, msg: "Email not sent" });
}
};

module.exports = senMail;


// input 

// {    
//   "receiverId" : "navinpatidar954@gmail.com",
//   "sub":"np",
//   "text":"np"
// }