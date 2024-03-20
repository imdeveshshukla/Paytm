const express = require('express');
const { User, Account } = require('../db');
const { authenticate } = require('../middleware');
const { default: mongoose } = require('mongoose');
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
    //Bad Version

    const body = req.body;
    const senderId = req.userId;
    if(!body){
        return res.json({
            message:"Body is Empty"
        })
    }
    const receiver = await Account.findOne({
        user:body.to
    });
    const sender = await Account.findOne({
        user:senderId
    });


    if(!receiver)
    {
        return res.status(404).json({
            message:"Receivers Invalid Account"
        })
    }
    if(!sender)
    {
        return res.status(404).json({
            message:"Senders Invalid Account"
        })
    }
    
    if(sender.balance < body.amount)
    {
        return res.status(400).json({
            message:"Insufficien Amount"
        })
    }

    await Account.updateOne({user:senderId},
        {$inc:{
        balance: -body.amount
        }
    });
    await Account.updateOne({user:body.to},
        {$inc:{
        balance: body.amount
        }
    });

     // Commit the transaction
    res.status(200).json({
        message: "Transfer successful"
    })


    //Good Version --- https://stackoverflow.com/questions/51461952/mongodb-v4-0-transaction-mongoerror-transaction-numbers-are-only-allowed-on-a
    // const session = await mongoose.startSession();

    // session.startTransaction();


    // const body = req.body;
    // const senderId = req.userId;
    // if(!body){
    //     return res.json({
    //         message:"Body is Empty"
    //     })
    // }
    // const receiver = await Account.findOne({
    //     user:body.to
    // }).session(session);
    // const sender = await Account.findOne({
    //     user:senderId
    // }).session(session);


    // if(!receiver || !sender)
    // {
    //     await session.abortTransaction();
    //     return res.status(404).json({
    //         message:"Invalid Account"
    //     })
    // }
    
    // if(sender.balance < body.amount)
    // {
    //     await session.abortTransaction();
    //     return res.status(400).json({
    //         message:"Insufficien Amount"
    //     })
    // }

    // await Account.updateOne({user:senderId},
    //     {$inc:{
    //     balance: -body.amount
    //     }
    // }).session(session);
    // await Account.updateOne({user:body.to},
    //     {$inc:{
    //     balance: body.amount
    //     }
    // }).session(session);

    //  // Commit the transaction
    //  await session.commitTransaction();
    // res.status(200).json({
    //     message: "Transfer successful"
    // })

    


    
});

module.exports = router;