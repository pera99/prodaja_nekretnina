import express from 'express';
import cors from 'cors'; 
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routers/user.routes';
import agencyRouter from './routers/agency.routes';
import locationRouter from './routers/location.routes';
import realEstateRouter from './routers/real_estate.routes';


const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
mongoose.connect('mongodb://localhost:27017/prodaja_nekretnina');
const connection=mongoose.connection;

connection.once('open',()=>{
    console.log("db connection ok!");
});


const router=express.Router();
router.use('/users', userRouter);
router.use('/agencies', agencyRouter);
router.use('/locations', locationRouter);
router.use('/realestates',realEstateRouter);


app.use('/',router);
app.listen(4000, () => console.log(`Express server running on port 4000`));