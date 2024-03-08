const {Router} = require('express')
const { UserModel } = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userController = Router();

userController.post('/signup', (req, res)=> {
    const { name, email, password, age} = req.body; 

    bcrypt.hash(password, 8, async(err, hash)=> {
        const new_user = new UserModel({
            name,
            email, 
            password : hash, 
            age
        })
        try
        {
        await new_user.save();
        res.status(200).send({msg : "User successfully created", new_user})
        }
        catch(err)
        {
            res.status(500).send("Something went wrong");
        }
    })
})

userController.post('/login', async(req, res)=> {
    const {email, password } = req.body;
    const user = await UserModel.findOne({email});
    const hash = user?.password;
    bcrypt.compare(password, hash, async(err,result)=> {
        if(result)
        {
            const token = jwt.sign({userId : user._id}, 'shhhhh')
            res.send({"message" : "Login successfull", "token": token});
        }
            res.status(500).send("Something went wrong");
    })
})

module.exports = {
    userController
}