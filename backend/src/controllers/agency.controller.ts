import * as express from 'express';
import Agency from '../models/agency';
 
export class AgencyController{
    getAgencies=(req: express.Request,res:express.Response)=>{
        Agency.find({},(err,agencies)=>{
            if(err){
                console.log(err);
            }else{       
                console.log(agencies);    
                res.status(200).json(agencies);
            }
        });
    }

    addAgency=(req: express.Request,res:express.Response)=>{
        let agency= new Agency(req.body);
        
        // polja su required , mora da ih ima , moze bez provere
        agency.save().then(agency=>{
            res.status(200).json({'message': 'ok'});
        }).catch(err=>{
            console.log(err);
            
        });
    }

    getAgency=(req: express.Request,res:express.Response)=>{
        Agency.findOne({name: req.body.name},(err,agencies)=>{
            if(err){
                console.log(err);
            }else{       
                console.log(agencies);    
                res.status(200).json(agencies);
            }
        });
    }
}