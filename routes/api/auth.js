const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
require("dotenv").config();

//@POST Route
//@DESC Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    var user = await User.findOne({ email });
    if (!user) {
      return res.json({ msg: "User Doesn't Exist!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ msg: "Password not correct!"});
    }
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.jwtSecret,
      {
        expiresIn: 360000000000,
      },
      (err, token) => {
        if (err) throw err;
        return res.json({
          msg: "User Signed in successfully",
          token: token,
          user: user,
        });
      }
    );
  } catch (error) {
    console.log(error.message);
  }
});

//@POST Route
//@DESC Signup Route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (name == '' || email == '' || password == '') {
      return res.json({ msg: "Empty field", status: "400" });
    }
    var user = await User.findOne({ email });
    if (user) {
      return res.json({ msg: "User with Same Email Already Exists!", status: "303" });
    }
   // debugger;
    user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.jwtSecret,
      {
        expiresIn: 360000000,
      },
      (err, token) => {
        if (err) throw err;
        return res.json({ msg: "User Created Successfully!", token: token, status: 200 });
      }
    );
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
