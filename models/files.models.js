const mongoose=require('mongoose');


const fileSchema=new mongoose.Schema({
    path:{
        type:String,
        required:[true,'Path is required']
    }
    ,
    orignalname:{
        type:String,
        required:['true','Orignal name is required']
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:[true,'User is required']
    }
})

const file=mongoose.model('file',fileSchema)
module.exports=file;