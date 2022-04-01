import express from 'express';
import { LocationController } from '../controllers/location.controller';

const locationRouter=express.Router();

/*locationRouter.route('/locations').get((req,res)=>{
    new LocationController().getLocations(req,res);
});*/

locationRouter.route('/getCities').get((req,res)=>{
    new LocationController().getCities(req,res);
});

locationRouter.route('/getMunicipalitiesForCity').post((req,res)=>{
    new LocationController().getMunicipalitiesForCity(req,res);
});

locationRouter.route('/getMicrolocationsForCityAndMunicipality').post((req,res)=>{
    new LocationController().getMicrolocationsForCityAndMunicipality(req,res);
});

locationRouter.route('/addMicrolocation').post((req,res)=>{
    new LocationController().addMicrolocation(req,res);
});

locationRouter.route('/addStreetToMicrolocation').post((req,res)=>{
    new LocationController().addStreetToMicrolocation(req,res);
});

locationRouter.route('/getMicrolocations').get((req,res)=>{
    new LocationController().getMicrolocations(req,res);
});

locationRouter.route('/deleteMicrolocation').post((req,res)=>{
    new LocationController().deleteMicrolocation(req,res);
});

locationRouter.route('/getMunicipalities').get((req,res)=>{
    new LocationController().getMunicipalities(req,res);
});

export default locationRouter;