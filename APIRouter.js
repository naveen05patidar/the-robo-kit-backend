const userSchema = require("./Modal/userModal");

const loginFunction = async (req, res) => {
  const { OTP, receiverId } = req.body;
  const date = new Date();
  const dateTime = date.setMinutes(date.getMinutes());
  try {
    const dataSchema = await userSchema.findOne({ email: receiverId });
    console.log(dataSchema);
    if (dataSchema) {
      if (dataSchema.expire > dateTime) {
        console.log(dataSchema.otp);
        console.log(OTP);
        if (dataSchema.otp == OTP) {
          res
            .status(200)
            .json({
              success: true,
              message: "Login Success fully",
              userId: receiverId,
            });
        } else {
          res
            .status(400)
            .json({ success: false, message: "Invalid OTP" });
        }
      } else {
        res.status(400).json({ success: false, message: "OTP is Expired" });
      }
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const videoUpload = (req, res)=>{
res.send("api is running")
}

module.exports = {
  loginFunction,
  videoUpload,
};



// Input Login API
// {    
//   "receiverId" : "poojapatidar4197@gmail.com",
//   "OTP":"509735"
// }