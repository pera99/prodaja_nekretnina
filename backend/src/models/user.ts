import mongoose from 'mongoose';

const Schema=mongoose.Schema;

let User=new Schema({
    firstname:{
        type: String,
        required: true 
    },
    lastname:{
        type: String,
        required: true 
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true 
    },
    confirm_password:{
        type: String,
        required: true 
    },
    city:{
        type: String,
        required: true 
    },
    telephone:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true, 
        unique: true
    },
    birthday:{
        type:Date,
        required: true 
    },
    type:{
        type: String,
        required: true 
    },
    advertiserType:{
        type: String
    },
    agency:{
        type: String
    },
    licence:{
        type: Number
    },
    valid:{
        type:Boolean,
        required: true 
    },
    image:{
        type: String,
        required: true
    }
});

export default mongoose.model("User",User,"users");