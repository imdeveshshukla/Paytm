const express = require('express');
const { User, Account } = require('../db');
const { authenticate } = require('../middleware');
const router = express.Router();

router.get("/",(req,res)=>{
    return res.json({
        Server:"Healthy"
    })
})

router.get("/bal",authenticate,async(req,res)=>{
    const userId = req.userId;

    const account = await Account.findOne({
        user: userId
    });



    res.json({
        balance: account.balance
    })
    

})

router.post("/transfer",authenticate,async(req,res)=>{
    const body = req.body;
    const senderId = req.userId;
    if(!body){
        return res.json({
            message:"Body is Empty"
        })
    }
    const receiver = await User.findOne({
        username:body.to
    })

    if(!receiver)
    {
        return res.status(404).json({
            message:"Invalid Account"
        })
    }

    
});

module.exports = router;