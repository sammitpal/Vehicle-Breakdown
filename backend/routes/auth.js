const router = require('express').Router();
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation');
const bycrypt = require('bcryptjs');
router.post('/register', async (req,res)=>{
    
    const {error} = registerValidation(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist){
        return res.status(400).send('Email already exist')
    }

    const salt = await bycrypt.genSalt(10);
    const hashPassword =  await bycrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id})
    }catch(err){
        res.statusCode(400).send(err)
    }
})

router.post('/login', async (req,res)=>{
    console.log(req.body)
    const {error} = loginValidation(req.body)
    if(error){
        return res.status(200).json({
            message: error.details[0].message
        })
    }

    const user = await User.findOne({email: req.body.email});
    if(!user){
        return res.status(400).json({
            message: 'You are not register'
        })
    }
    const validPass = await bycrypt.compare(req.body.password, user.password)

    if(!validPass){
        return res.status(400).json({
            message: 'Invalid Password'
        })
    }
    res.status(200).json({
        message: 'Success',
        name: await user.name,
        uid: await user._id
    })
})

module.exports = router;