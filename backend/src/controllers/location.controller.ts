import * as express from 'express';
import City from '../models/locations';
import Microlocation from '../models/microlocations';
 
export class LocationController{
    getCities=(req: express.Request,res:express.Response)=>{
        let query=City.find({}).select('name -_id');

        query.exec((err,cities)=>{
            if(err){
                console.log(err);
            }else{        
                res.status(200).json(cities);
            }
        });

    }

    getMunicipalitiesForCity=(req: express.Request,res:express.Response)=>{
        let city=req.body.city;

        if(city==undefined){
            res.status(400).json({error:"Data mising!"});
        }

        let query=City.find({name: city}).select("municipalities -_id");
        console.log("OVDE");
        query.exec((err,municipalities)=>{
            if(err){
                console.log(err);
            }else{        
                console.log(municipalities);
                res.status(200).json(municipalities);
            }
        });
    }

    getMicrolocationsForCityAndMunicipality=(req: express.Request,res:express.Response)=>{
        let city=req.body.city;
        let municipality=req.body.municipality;

        if(city==undefined || municipality==undefined){
            res.status(400).json({error:"Data mising!"});
        }

        let query=Microlocation.find({city: city, municipality: municipality}).select("name -_id");

        query.exec((err,microlocations)=>{
            if(err){
                console.log(err);
            }else{        
                console.log(microlocations)
                
                res.status(200).json(microlocations);
            }
        });
    }

    addMicrolocation=(req: express.Request,res:express.Response)=>{
        let city=req.body.city;
        let municipality=req.body.municipality;
        let new_microlocation=req.body.new_microlocation;

        if(city==undefined || municipality==undefined || new_microlocation==undefined){
            res.status(400).json({error:"Data mising!"});
        }

        let new_mic = new Microlocation({city: city,municipality: municipality, name: new_microlocation, streets:[]}); 
        new_mic.save(function (err, m) {
            if (err) { 
                console.error(err);
            }else{
                console.log(m + " saved!.");
                res.status(200).json({"message":"ok"});
            }
        });
    }

    addStreetToMicrolocation=(req: express.Request,res:express.Response)=>{
        let city=req.body.city;
        let municipality=req.body.municipality;
        let microlocation=req.body.microlocation;
        let new_street=req.body.new_street;

        if(city==undefined || municipality==undefined || microlocation==undefined || new_street==undefined){
            res.status(400).json({error:"Data mising!"});
        }

        Microlocation.findOneAndUpdate({city: city,municipality: municipality, name: microlocation},{$push: {streets: new_street}}, (err, m)=>{
            if (err) {
                console.error(err);
            }else{
                res.status(200).json({"message":"ok"});
            }
            
        });


    }

    getMicrolocations=(req: express.Request,res:express.Response)=>{
        let query=Microlocation.find({});

        query.exec((err,microlocations)=>{
            if(err){
                console.log(err);
            }else{        
                res.status(200).json(microlocations);
            }
        });

    }

    deleteMicrolocation=(req: express.Request,res:express.Response)=>{
        let city=req.body.city;
        let municipality=req.body.municipality;
        let name=req.body.name;

        if(city==undefined || municipality==undefined || name==undefined){
            res.status(400).json({error:"Data mising!"});
        }

        Microlocation.findOneAndDelete({city: city,municipality: municipality,name: name},(err,m)=>{
            if(err){
                console.log(err);
            }else{        
                res.status(200).json({"message":"ok"});
            }
        });

    }

    getMunicipalities=(req: express.Request,res:express.Response)=>{
        let query=City.find({}).select("municipalities");

        query.exec((err,microlocations)=>{
            if(err){
                console.log(err);
            }else{        
                console.log(microlocations);
                res.status(200).json(microlocations);
            }
        });

    }
}