import * as express from 'express';
import RealEstate from '../models/real_estate';
import Microlocation from '../models/microlocations';
import real_estate from '../models/real_estate';
 
export class RealEstateController{
    addRealEstate=(req: express.Request,res:express.Response)=>{
        let data=req.body;
        //console.log(data);

        if(data.Name==undefined || data.Type==undefined || data.City==undefined || data.Municipality==undefined || data.Microlocation==undefined 
            || data.Street==undefined || data.Area==undefined || data.Rooms==undefined || data.ConstructionYear==undefined || 
            data.State==undefined || data.Heating==undefined || data.Floor==undefined || data.TotalFloors==undefined || data.Parking==undefined 
            || data.MonthlyUtilities==undefined || data.Price==undefined || data.About==undefined || data.Characteristics==undefined 
            || data.Advertiser==undefined || data.Images==undefined || data.advertiserType==undefined ){

            res.status(400).json({error:"Data mising!"});
            return;
        }

        let images=data.Images;

        if(images.length<3 || images.length>6){
            res.status(400).json({error:"Send 3-6 images!"});
            return;
        }

        let words_in_about = data.About.split(" ");
        if(words_in_about.length>50){
            res.status(400).json({error:"About >50 words!"});
            return;
        }

        data.Sold=false;
        data.LastModified=new Date().setTime(new Date().getTime()-3600000); // -1h kad se napravi;
        data.AdvertisedDate=new Date();

        let real_estate= new RealEstate(data);
        
        Microlocation.findOneAndUpdate({city: data.City,municipality: data.Municipality, name: data.Microlocation},{$inc:{'advertised_number' : 1}}).exec();

        real_estate.save().then(real_estate=>{
            res.status(200).json({'message': 'ok'});
        }).catch(err=>{
            console.log(err);
            
        });
    }

    getRealEstate=(req: express.Request,res:express.Response)=>{
        let advertiser=req.body.advertiser;

        if(advertiser==undefined){
            res.status(400).json({error:"Data mising!"});
        }
        
        RealEstate.find({Advertiser: advertiser},(err,real_estates)=>{
            if(err){
                console.log(err);
            }else{           
                res.status(200).json(real_estates);
            }
        });
    }

    sellRealEstate=(req: express.Request,res:express.Response)=>{
        let advertiser=req.body.advertiser;
        let name=req.body.name;
        let price=req.body.price;

        if(advertiser==undefined || name==undefined || price==undefined){
            res.status(400).json({error:"Data mising!"});
        }
        
        RealEstate.findOneAndUpdate({Advertiser: advertiser,Name: name, Price: price},{Sold: true}, (err, m)=>{
            if (err) {
                console.error(err);
            }else{
                res.status(200).json({"message":"ok"});
            }
            
        });
    }

    updateRealEstate=(req: express.Request,res:express.Response)=>{
        let data=req.body;
        //console.log(req.body);

        if(data.Name==undefined || data.Type==undefined || data.City==undefined || data.Municipality==undefined || data.Microlocation==undefined 
            || data.Street==undefined || data.Area==undefined || data.Rooms==undefined || data.ConstructionYear==undefined || 
            data.State==undefined || data.Heating==undefined || data.Floor==undefined || data.TotalFloors==undefined || data.Parking==undefined 
            || data.MonthlyUtilities==undefined || data.Price==undefined || data.About==undefined || data.Characteristics==undefined 
            || data.Advertiser==undefined || data.Images==undefined || data.advertiserType==undefined ){

            res.status(400).json({error:"Data mising!"});
            return;
        }

        let today=new Date();

        data.LastModified=today;
        
        RealEstate.findOne({Advertiser: data.Advertiser, Name: data.old_name},(err, real_estate:any)=>{
            if (err) {
                console.error(err);
            }else{
                /*console.log("Provera updejta!");
                console.log(real_estate);*/

                if(!real_estate){
                    res.status(400).json({error:"Not found!"});
                }
                else
                {
                    let LastModified = new Date();
                    LastModified.setTime(Date.parse(real_estate.LastModified));

                    //console.log(real_estate.LastModified);
                    //console.log(today);
                    //console.log(LastModified);

                    if( (today.getTime() - LastModified.getTime()) < 3600000){
                        res.status(200).json({"message":"hour_error"});
                    }else{

                        RealEstate.findOneAndUpdate({Advertiser: data.Advertiser, Name: data.old_name},data, (err, m)=>{
                            if (err) {
                                console.error(err);
                            }else{
                                res.status(200).json({"message":"ok"});
                            }
                            
                        });
    
                    }
                    
                }

            
            }
            
        });

    }

    searchRealEstate=(req: express.Request,res:express.Response)=>{
        let data=req.body;
        
        let search;
        // ovde vraca sve sa (city or microlocation) koji se poklapaju
        if(data.city!=undefined && data.microlocation!=undefined && data.municipality==undefined){
            search={
                Type: data.type,
                Sold: false,
                $or: [{City : data.city},{Microlocation : data.microlocation}]
            }
        }else{
            search={
                Type: data.type,
                Sold: false
            }

            if(data.city!=undefined){
                search["City"] = data.city;
            }
    
            if(data.municipality!=undefined){
                search["Municipality"] = data.municipality;
            }
    
            if(data.microlocation!=undefined){
                search["Microlocation"] = data.microlocation;
            }
        }

        if(data.max_price!=undefined){
            search["Price"]={ $lte: data.max_price };
        }
        
        if(data.min_area!=undefined){
            search["Area"]={ $gte: data.min_area };
        }

        if(data.min_rooms!=undefined){
            search["Rooms"]={ $gte: data.min_rooms };
        }


        //console.log(search);

        RealEstate.find(search, (err, real_estates)=>{
            if (err) {
                console.error(err);
            }else{
                res.status(200).json(real_estates);
            }
            
        });
    }

    addToFavorites=(req: express.Request,res:express.Response)=>{
        let data=req.body;
        //console.log(data)
        
        let update={
            $push:{
                Favorites: req.body.username
            }
        }

        RealEstate.findOneAndUpdate({Advertiser: data.advertiser, Name: data.name},update, (err, m)=>{
            if (err) {
                console.error(err);
            }else{
                res.status(200).json({"message":"ok"});
            }
            
        });
    }

    getFavorites=(req: express.Request,res:express.Response)=>{
        let username=req.body.username;
        
        RealEstate.find({Favorites: username},(err,real_estates)=>{
            if(err){
                console.log(err);
            }else{           
                res.status(200).json(real_estates);
            }
        });
    }

    removeFromFavorites=(req: express.Request,res:express.Response)=>{
        let name=req.body.name;
        let advertiser=req.body.advertiser;
        let username=req.body.username;
        
        let update={
            $pull:{
                Favorites: username
            }
        }

        RealEstate.collection.updateMany({Advertiser: advertiser, Name: name},update, (err, m)=>{
            if (err) {
                console.error(err);
            }else{
                res.status(200).json({"message":"ok"});
            }
            
        });
    }

    searchRealEstateAdvanced=(req: express.Request,res:express.Response)=>{
        let data=req.body;
        //console.log(data)
        

        let search={
        }

        // price
        let min_price;
        if(data.min_price==undefined){
            min_price=0;
        }else{
            min_price=data.min_price;
        }
        
        if(data.max_price==undefined){
            search["Price"]={ $gte: min_price };
        }else{
            search["Price"]={ $gte: min_price , $lte: data.max_price};
            //search["$and"]=[ {Price: { $gte: min_price}}, {Price: {$lte:data.max_price}} ];
        }

        // area
        let min_area;
        if(data.min_area==undefined){
            min_area=0;
        }else{
            min_area=data.min_area;
        }
        
        if(data.max_area==undefined){
            search["Area"]={ $gte: min_area };
        }else{
            search["Area"]={ $gte: min_area , $lte: data.max_area};
        }
        
        // rooms
        let min_rooms;
        if(data.min_rooms==undefined){
            min_rooms=0;
        }else{
            min_rooms=data.min_rooms;
        }
        
        if(data.max_rooms==undefined){
            search["Rooms"]={ $gte: min_rooms };
        }else{
            search["Rooms"]={ $gte: min_rooms , $lte: data.max_rooms};
        }        
        
        
        // year
        let year_od;
        if(data.year_od==undefined){
            year_od=0;
        }else{
            year_od=data.year_od;
        }
        
        if(data.year_do==undefined){
            search["ConstructionYear"]={ $gte: year_od };
        }else{
            search["ConstructionYear"]={ $gte: year_od , $lte: data.year_do};
        }              

       // advertiser type ,
        if(data.advertiser_type!=undefined){
            search["advertiserType"]={ $in: data.advertiser_type };
        } 

        
        // stanje nekretnine 
        if(data.stanje_nekretnine!=undefined){
            search["State"]={ $in: data.stanje_nekretnine };
        } 

        // tip grejanja
        if(data.tip_grejanja!=undefined){
            search["Heating"]={ $in: data.tip_grejanja };
        }         

        // floor
        let floor_od;
        if(data.floor_od==undefined){
            floor_od=0;
        }else{
            floor_od=data.floor_od;
        }
        
        if(data.floor_do==undefined){
            search["Floor"]={ $gte: floor_od };
        }else{
            search["Floor"]={ $gte: floor_od , $lte: data.floor_do};
        }  


        // mesecne_rezije_od
        let mesecne_rezije_od;
        if(data.mesecne_rezije_od==undefined){
            mesecne_rezije_od=0;
        }else{
            mesecne_rezije_od=data.mesecne_rezije_od;
        }
        
        if(data.mesecne_rezije_do==undefined){
            search["Floor"]={ $gte: mesecne_rezije_od };
        }else{
            search["Floor"]={ $gte: mesecne_rezije_od , $lte: data.mesecne_rezije_do};
        }          
        
        // karakteristike
        if(data.characteristics!=undefined){
            search["Characteristics"]={ $all: data.characteristics };
        }    

        RealEstate.find(search, (err, real_estates)=>{
            if (err) {
                console.error(err);
            }else{
                res.status(200).json(real_estates);
            }
            
        });
    }


    get5LastAdvertised=(req: express.Request,res:express.Response)=>{
        
        RealEstate.find({}).sort({AdvertisedDate: -1}).limit(5).exec((err,real_estates)=>{
            if(err){
                console.log(err);
            }else{       
                console.log(real_estates);    
                res.status(200).json(real_estates);
            }
        });

    }

    addRealEstateJSON=(req: express.Request,res:express.Response)=>{
        let data=req.body.Realestate;
        //console.log(data);
        if(data.Name==undefined || data.Type==undefined || data.City==undefined || data.Municipality==undefined || data.Microlocation==undefined 
            || data.Street==undefined || data.Area==undefined || data.Rooms==undefined || data.ConstructionYear==undefined || 
            data.State==undefined || data.Heating==undefined || data.Floor==undefined || data.TotalFloors==undefined || data.Parking==undefined 
            || data.MonthlyUtilities==undefined || data.Price==undefined || data.About==undefined || data.Characteristics==undefined 
            || req.body.advertiser==undefined || req.body.images==undefined || req.body.advertiserType==undefined ){

            res.status(400).json({error:"Data mising!"});
            return;
        }

        let images=req.body.images;

        if(images.length<3 || images.length>6){
            res.status(400).json({error:"Send 3-6 images!"});
            return;
        }

        let words_in_about = data.About.split(" ");
        if(words_in_about.length>50){
            res.status(400).json({error:"About >50 words!"});
            return;
        }

        data.Sold=false;
        data.LastModified=new Date().setTime(new Date().getTime()-3600000); // -1h kad se napravi;
        data.AdvertisedDate=new Date();
        //console.log(data);

        data.Images = req.body.images;
        data.Advertiser = req.body.advertiser;
        data.advertiserType = req.body.advertiserType;

        let real_estate= new RealEstate(data);
        
        Microlocation.findOneAndUpdate({city: data.City,municipality: data.Municipality, name: data.Microlocation},{$inc:{'advertised_number' : 1}}).exec();

        real_estate.save().then(real_estate=>{
            res.status(200).json({'message': 'ok'});
        }).catch(err=>{
            console.log(err);
            
        });
    }

    getAvgPrice=(req: express.Request,res:express.Response)=>{
        
        console.log("AVG:");
        console.log(req.body);

        let type=req.body.type;
        let city=req.body.city
        let municipality=req.body.municipality;
        let microlocation=req.body.microlocation;


        real_estate.aggregate(
            [
              {
                $match:
                {
                    Type: type,
                    City: city,
                    Municipality: municipality,
                    Microlocation: microlocation
                }

              }, 
              {
                $group:
                  {
                    _id: {Type: "$Type", City: "$City",Municipality: "$Municipality",Microlocation: "$Microlocation"},
                    avgAmount: { $avg: { $divide: [ "$Price", "$Area" ] } },
                  }
              }
            ]
         ).exec((err,real_estates)=>{
            if(err){
                console.log(err);
            }else{       
                console.log(real_estates);    
                res.status(200).json(real_estates);
            }
        });

    }
}
