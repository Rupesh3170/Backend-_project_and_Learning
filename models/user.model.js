const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[3,"username must be of atleast 3 letters"]
    },
     email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[13,"Email must be of atleast 13 letters"]
    },
     password:{
        type:String,
        required:true,
        trim:true,
        minlength:[5,"username must be of atleast 5 letters"]
    },


})
const user=mongoose.model('user',userSchema)
module.exports=user;