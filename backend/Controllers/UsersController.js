const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const userServices = require('../Services/UserService');
// const userServices=require('../Services/UserService');
const { Student, Faculty, Dean,Principal } = require('../Modals/UsersModel');
const multer=require('multer');
const { CertificateApplication } = require('../Modals/certificate');


router.post('/register/:userType', async (req, res, next) => {
    const userType=req.params.userType;
    let User;

    switch(userType){
        case 'Student':{
            User = Student;
            break;
        }
        case 'Faculty':{
            User = Faculty;
            break;
        }
        case 'Dean':{
            User = Dean;
            break;
        }
        case 'Principal':{
            User = Principal;
            break;
        }
    }

    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);



    try {
        const user = new User(req.body);
        await user.save();
        return res.json("Saved successfully");
    } catch (error) {
        return res.status(400).json(error);
    }
    
    // const {password} = req.body
    // const salt = bcrypt.genSaltSync(10);
    // req.body.password = bcrypt.hashSync(password, salt);

    // userServices.register(req.body).then(
    //     () => {return res.json('success')}
    // ).catch(
    //     err => {return res.json(err)}
    // )
})

// router.get('/details',async(req,res) => {
//   try{
//     const orgs= await Needy.find({});
//     return res.json({ status: "ok", details:orgs });
// } catch (e) {
//   return res.json({ status: "error", error: e });
// }
  
// })

router.post('/login', (req, res, next) => {
    const { employeeNo, password} = req.body;
    
    userServices.login({ employeeNo, password})
        .then((user) => {
            if(user)
                return res.json(user)
            else 
                return res.sendStatus(500);
        }
    )
    
    
})

router.get('/get/:user', async (req, res, next) => {
    if(req.params.user=='dean'){
        const data=await Dean.find({approved:false});
        return res.json(data);
    }
    else if(req.params.user=='student'){
        const data=await Student.find({approved:false});
        return res.json(data);
    }
    else if(req.params.user=='faculty'){
        const data=await Faculty.find({approved:false});
        return res.json(data);
    }
    else if(req.params.user=='principal'){
        const data=await Principal.find({approved:false});
        return res.json(data);
    }
    
})

router.patch('/acceptUser/:id',async(req,res)=>{
    try{
        const data=await Dean.findByIdAndUpdate(req.params.id,req.body) || await Student.findByIdAndUpdate(req.params.id,req.body) || await Faculty.findByIdAndUpdate(req.params.id,req.body);
        return res.json(data);
    }
    catch(error){
        return res.json(error)
    }
    
    
})

router.patch('/forward/:id',async(req,res)=>{
    try{
        const data=await CertificateApplication.findByIdAndUpdate(req.params.id,req.body);
        return res.json(data);
    }
    catch(error){
        return res.json(error)
    }
    
    
})
router.get('/getApplicationForms/:id', async (req, res, next) => {
    try{
        let data=await CertificateApplication.find({to:req.params.id});
        return res.json(data);
    }
    catch(error){
        return res.json(error);
    }
})
// test ths is written by jaidanjkjkljkljkljljkljkljkljklj
router.patch('/sendFriendRequest',async(req,res)=>{
    let data=await User.findByIdAndUpdate(req.body.to,req.body.toBeUpdated);
    if(data)
        return res.json("Updated!!");
    else
        return res.status(404);
    
})

router.put('/updateProfile/:id',async(req,res)=>{
    try{
        let data=await User.findByIdAndUpdate(req.params.id,req.body);
    
        return res.json("Updated");
    }catch(e){
        return res.json(e);
    }
    
})

router.patch('/acceptFriendRequest',async(req,res)=>{
    let data=await User.findByIdAndUpdate(req.body.to,req.body.toBeUpdatedTo);
    let data2=await User.findByIdAndUpdate(req.body.by,req.body.toBeUpdatedBy);
    if(data && data2)
        return res.json("Updated!!");
    else
        return res.status(404);
    
})

module.exports = router;