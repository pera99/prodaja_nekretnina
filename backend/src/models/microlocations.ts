import mongoose from 'mongoose';

const Schema=mongoose.Schema;

let Microlocation=new Schema({
    city:{
        type: String
    },
    municipality:{
        type: String
    },
    name:{
        type: String
    },
    streets:{
        type: [String]
    },
    advertised_number:{
        type: Number,
        default: 0
    }
});

export default mongoose.model("Microlocation",Microlocation,"microlocations");