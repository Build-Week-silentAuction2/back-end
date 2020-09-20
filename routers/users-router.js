const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("../models/users-model")

const router = require('express').Router();

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await Users.findBy({ username }).first()
    if (user) {
      const passwordValid = await bcrypt.compare(password, user.password)
      if (passwordValid) {
        const token = jwt.sign({ user_id: user.id, user_role: user.role_id }, process.env.JWT_SECRET)

        res.json({ message: `Welcome ${username}!`, token: token })

      }
      else {
        return res.status(401).json({ message: "You shall not pass! Password incorrect" })
      }
    }
    else {
      return res.status(401).json({ message: "You shall not pass! Could not find User" })
    }
  }
  catch (err) {
    next(err)
  }
})

router.post('/register', async (req, res, next) => {
  try{
    const { username, password, role_id } = req.body;
    const user = await Users.findBy({ username }).first()
    if(user){
      return res.status(400).json({
        message: "Username already taken"
      })
    }
    const newUser = await Users.add({
      role_id,
      username,
      password: await bcrypt.hash(password, 14)
    })
    res.status(400).json(newUser)
  }
  catch(err){
    next(err)
  }
})

router.get("/", async (req, res, next) => {
  try{
    res.json(await Users.findAll())
  }
  catch(err){
    next(err)
  }
})
module.exports = router