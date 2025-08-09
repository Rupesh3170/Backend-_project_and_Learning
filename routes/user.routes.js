const express=require('express')
const router=express.Router();
const { body,validationResult } = require('express-validator');

const userModel=require('../models/user.model')

const bcrypt=require('bcrypt')


const jwt=require('jsonwebtoken')


router.get('/register',(req,res)=>{
    res.render('register')
})


/*

'a@a.com'
'           '  //people can type this type of email so use trim




*/




router.post('/register',
    body('email').trim().isEmail().isLength({min:13}),
    body('password').trim().isLength({min:5}),
    body('username').trim().isLength({min:3}),

    
    
    async (req,res)=>{

    const errors=validationResult(req);

       if(!errors.isEmpty()){
         return res.status(400).json({
            errors:errors.array(),
            message:'Invalid data'
         })
       }
    const{email,username,password}=req.body;
    const hashpassword=await bcrypt.hash(password,10)
    const newUser= await userModel.create({
        email,
        username,
        password:hashpassword
    })
    res.json(newUser)  //data jo transfer kar rahe uska format json hoga
})












router.get('/login',(req,res)=>{
    res.render('login');
})
router.post(
    '/login',
    
        body('username').trim().isLength({ min: 3 }),
        body('password').trim().isLength({ min: 5 })
    ,
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: errors.array(),
                message: 'Invalid Data'
            });
        }

        const{username,password}=req.body;
        const user=await userModel.findOne({
            username:username
        })
        if(!user){
            return res.status(400).json({
                message:'username or password is incorrect'
            })
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({
                message:'username or password is incorrect'
            })
        }

        //if password match we generate token
        const token=jwt.sign({

            userId:user._id,
            email:user.email,
            username:user.name
        },process.env.JWT_SECRET,
    )

    res.cookie('token',token)  //we set token  two parameter mangta hai
    res.send('Logged in')





    }
);

module.exports=router;