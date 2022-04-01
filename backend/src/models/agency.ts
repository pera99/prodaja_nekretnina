import mongoose from 'mongoose';

const Schema=mongoose.Schema;

let Agency=new Schema({
    name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    telephone:{
        type: String,
        required: true
    },
    pib:{
        type: String,
        required: true
    }
})

export default mongoose.model("Agency",Agency,"agencies");