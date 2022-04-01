import express from 'express';
import { RealEstateController } from '../controllers/real_estate.controller';

const realEstateRouter=express.Router();

realEstateRouter.route('/addRealEstate').post((req,res)=>{
    new RealEstateController().addRealEstate(req,res);
});

realEstateRouter.route('/getRealEstatesForAdvertiser').post((req,res)=>{
    new RealEstateController().getRealEstate(req,res);
});

realEstateRouter.route('/sellRealEstate').post((req,res)=>{
    new RealEstateController().sellRealEstate(req,res);
});

realEstateRouter.route('/updateRealEstate').post((req,res)=>{
    new RealEstateController().updateRealEstate(req,res);
});

realEstateRouter.route('/searchRealEstate').post((req,res)=>{
    new RealEstateController().searchRealEstate(req,res);
});

realEstateRouter.route('/addToFavorites').post((req,res)=>{
    new RealEstateController().addToFavorites(req,res);
});

realEstateRouter.route('/getFavorites').post((req,res)=>{
    new RealEstateController().getFavorites(req,res);
});

realEstateRouter.route('/removeFromFavorites').post((req,res)=>{
    new RealEstateController().removeFromFavorites(req,res);
});

realEstateRouter.route('/searchRealEstateAdvanced').post((req,res)=>{
    new RealEstateController().searchRealEstateAdvanced(req,res);
});

realEstateRouter.route('/get5LastAdvertised').get((req,res)=>{
    new RealEstateController().get5LastAdvertised(req,res);
});

realEstateRouter.route('/addRealEstateJSON').post((req,res)=>{
    new RealEstateController().addRealEstateJSON(req,res);
});

realEstateRouter.route('/getAvgPrice').post((req,res)=>{
    new RealEstateController().getAvgPrice(req,res);
});


export default realEstateRouter;