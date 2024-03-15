
const mongoose =require("mongoose");
mongoose.connect("mongodb://localhost:27017/Paytm")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true,
        minLength:6,
        maxLength:100
    }
});

const accountSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    balance:{
        type:Number,
        require:true,
        default:0
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }

})

const User = new mongoose.model("User",userSchema);
const Account = new mongoose.model("Account",accountSchema);
module.exports = {
	User,
    Account
};