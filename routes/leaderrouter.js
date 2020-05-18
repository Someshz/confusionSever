const express=require("express");
const bodyParser=require("body-parser");
const Leaders=require("../models/leaders")
const leaderRoute=express.Router();
leaderRoute.use(bodyParser.json());

leaderRoute.route("/")
.get((req,res,next)=>
{
   Leaders.find({})
   .then((leads)=>
   {
    res.statusCode=200;
    res.setHeader('Content-Type', 'application/json');
    res.json(leads);
    },(err)=>
    {
        console.log("testing");
        next(err);
    })
    .catch((err)=>
    {
        next(err);
    })
})

.post((req,res,next)=>
{
    Leaders.create(req.body)
    .then((lead)=>
    {
       console.log('Dish Created ', lead);
       res.statusCode=200;
       res.setHeader('Content-Type', 'application/json');
       res.json(lead);
    },(err)=>
    {
        next(err);
    })
    .catch((err)=>
    {
        next(err);
    })
})

.put((req,res,next)=>
{   res.statusCode=403;
    res.end("cannot put the information");
})

.delete((req,res,next)=>
{
    Leaders.remove({})
    .then((resp)=>
    {
       res.statusCode=200;
       res.setHeader('Content-Type', 'application/json');
       res.json(resp);
    },(err)=>
    {
        next(err);
    })
    .catch((err) => next(err));
})

leaderRoute.route("/:leadId")
.get((req,res,next)=>
{
    Leaders.findById(req.params.leadId)
    .then((leads)=>
    {
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leads);
     },(err)=>
     {
         next(err);
     })
     .catch((err)=>
     {
         next(err);
     })
 })

.post((req,res,next)=>
{
    res.statusCode=403;
    res.end("post operation not supported on /dishes/"+req.params.leadId);
})

.put((req,res,next)=>
{   
    Leaders.findByIdAndUpdate(req.params.leadId,{$set:req.body},{new:true})
    .then((leads)=>
    {
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leads);
     },(err)=>
     {
         next(err);
     })
     .catch((err)=>
     {
         next(err);
     })
})

.delete((req,res,next)=>
{
    Leaders.findByIdAndRemove(req.params.leadId)
    .then((resp)=>
    {
       res.statusCode=200;
       res.setHeader('Content-Type', 'application/json');
       res.json(resp);
    },(err)=>
    {
        next(err);
    })
    .catch((err) => next(err));
})


module.exports=leaderRoute;