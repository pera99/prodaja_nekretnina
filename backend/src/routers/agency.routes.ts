import express from 'express';
import { AgencyController } from '../controllers/agency.controller';

const agencyRouter=express.Router();

agencyRouter.route('/add').post((req,res)=>{
    new AgencyController().addAgency(req,res);
});

agencyRouter.route('/agencies').get((req,res)=>{
    new AgencyController().getAgencies(req,res);
});

agencyRouter.route('/getAgency').post((req,res)=>{
    new AgencyController().getAgency(req,res);
});


export default agencyRouter;