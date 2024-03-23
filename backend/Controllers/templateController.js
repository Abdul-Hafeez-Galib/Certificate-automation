const express=require('express');
const router=express.Router();
const {templates}=require('../Modals/template');

router.post('/addTemplate',async(req,res)=>{
    try {

        const template = await templates.create(req.body);
        return res.status(201).json({ message: 'template added successfully',data:template });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
})

router.get('/getTemplate/:type',async(req,res)=>{
    try{
        const result=await templates.findOne({type:req.params.type});
        return res.status(201).json({ message: 'template fetched successfully',data:result });
    }catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
})

module.exports=router;
