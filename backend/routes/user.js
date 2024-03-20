const express = require('express')
const {User, Account} = require('../db')
const router = express.Router();
const z = require('zod');
const jwt = require('jsonwebtoken');
const JWT_TOKEN = require('../config');
const bcrypt = require('bcrypt');
const { authenticate } = require('../middleware');
const { json } = require('body-parser');
const saltRounds = 10;

const userSchema = z.object({
    username:z.string().email(),
    name:z.string(),
    password:z.string().min(6)
})
const signinSchema = z.object({
    username:z.string().email(),
    password:z.string().min(6)
})
const updateBody = z.object({
    password:z.string().optional(),
    name:z.string().optional()
})

function generateToken(userId){
    return jwt.sign({
        userId
    },JWT_TOKEN);
}


function genHashPass(pass){
    return bcrypt.hash(pass, saltRounds).then(function(hash) {
        return hash;
    });
    
}

async function verifyPass(candidatePassword,actualPass) {
    return await bcrypt.compare(candidatePassword, actualPass);
  };

function generateBalance(){
    return (Math.floor(Math.random() * 10000) + 1);
}
router.post("/signup",async (req,res)=>{
    const userdata = req.body;
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    const validateuser = userSchema.safeParse(userdata);
    if(!validateuser.success)
    {
        return res.json({
                "Inputs":"Incorrect Inputs",
                "Error":validateuser.error.issues[0]
            })
    }
    const user =await User.findOne({
        username:userdata.username
    })
    if(user)
    {
        return res.json({
            "Error":"Username Already Exist"
        });
    }
    
    const hashPass = await genHashPass(password);
    

    const createdUser = await User.create({
        username,
        name,
        password:hashPass
    });

    // console.log(createdUser);

    const account = await Account.create({
        user: createdUser._id,
        balance:generateBalance()
    })

    // console.log(account);

    return res.json({
        message:"User Created",
        token:generateToken(createdUser._id),
        Balance:account.balance
    })
})

router.post("/signin",async(req,res)=>{
    const body = req.body;
    const username = body.username;
    const password = body.password;

    const validateuser = signinSchema.safeParse(body);
    if(!validateuser.success)
    {
        return res.json({
                "Inputs":"Incorrect Inputs",
                "ERROR":validateuser.error.issues[0]
            })
    }
    const user =await User.findOne({
        username
    })
    if(!user)
    {
        return res.json({
            "Error":"Username Not Exist"
        });
    }

    const hashPass = await genHashPass(password);
    if(!await verifyPass(password,user.password))
    {
        return res.json({
            "Error":"Wrong PassWord"
        })
    }



    const token = generateToken(user._id);

    res.json({
        Message:"Successfully Login",
        token : token
    })
})


router.put("/",authenticate,async(req,res)=>{
    const userid = req.userId;
    const body = req.body;
    const { success } = updateBody.safeParse(body);
    if(!success || !userid)
        return res.status(401).json({
            message:"Invalid Data"
        });

    
    const user  = await User.updateOne({_id: userid},body);

    console.log({
        success: user.acknowledged
        ,userid
        ,body});

    res.json({
        message:"Updated Successfully"
    })
})


router.get("/bulk",authenticate,async(req,res)=>{
    const filter = req.query.filter || "";
    const regex = new RegExp('^' + filter, 'i');
    const users = await User.find({
        name:{
            $regex:regex
        }
    });
    //console.log(users); //Contain Password which is very unsecure
    res.json(users.map(function(user){
        const obj = {
            id: user._id,
            name:user.name
        }
        return obj;
    }
    ));
})

module.exports = router;