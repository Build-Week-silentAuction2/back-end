const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("../models/users-model")

const router = require('express').Router();

router.post('/login', async (req, res, next) => {
    // implement login
    try{
      const { username, password } = req.body
      const user = await Users.findBy( { username } ).first()
      if(user){
        const passwordValid = await bcrypt.compare(password, user.password)
        if(passwordValid){
          const token = jwt.sign({ user_id: user.id, user_role: user.role_id }, process.env.JWT_SECRET)
          
          res.json({message: `Welcome ${ username }!`, token: token})
          
        }
        else{
          return res.status(401).json({ message: "You shall not pass!" })
        }
      }
      else{ 
        return res.status(401).json({ message: "You shall not pass!" })
      }
    }
    catch(err){
      next(err)
    }
  })