import express from 'express';
import { UserController } from '../controllers/user.controller';

const userRouter=express.Router();

userRouter.route('/login').post((req,res)=>{
    new UserController().login(req,res);
});

userRouter.route('/register').post((req,res)=>{
    new UserController().register(req,res);
});

userRouter.route('/requests').get((req,res)=>{
    new UserController().getRegisterRequests(req,res);
});

userRouter.route('/users').get((req,res)=>{
    new UserController().getUsers(req,res);
});

userRouter.route('/accept').post((req,res)=>{
    new UserController().acceptRegistration(req,res);
});

userRouter.route('/delete').post((req,res)=>{
    new UserController().deleteUser(req,res);
});

userRouter.route('/add').post((req,res)=>{
    new UserController().addUser(req,res);
});

userRouter.route('/update').post((req,res)=>{
    new UserController().updateUser(req,res);
});

userRouter.route('/changePassword').post((req,res)=>{
    new UserController().changePassword(req,res);
});

userRouter.route('/updateAdvertiser').post((req,res)=>{
    new UserController().updateAdvertiser(req,res);
});

userRouter.route('/updateAdvertiserAgency').post((req,res)=>{
    new UserController().updateAdvertiserAgency(req,res);
});

userRouter.route('/getAdvertiser').post((req,res)=>{
    new UserController().getAdvertiser(req,res);
});

export default userRouter;