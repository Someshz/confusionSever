const express=require("express");
const bodyParser=require("body-parser");
const Dishes=require("../models/dishes");

const dishRoute=express.Router();
dishRoute.use(bodyParser.json());

dishRoute.route("/")
.get((req,res,next)=>
{
   Dishes.find({})
   .then((dishes)=>
   {
    res.statusCode=200;
    res.setHeader('Content-Type', 'application/json');
    res.json(dishes);
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
    Dishes.create(req.body)
    .then((dish)=>
    {
       console.log('Dish Created ', dish);
       res.statusCode=200;
       res.setHeader('Content-Type', 'application/json');
       res.json(dish);
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
    Dishes.remove({})
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

dishRoute.route("/:dishId")
.get((req,res,next)=>
{
    Dishes.findById(req.params.dishId)
    .then((dishes)=>
    {
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
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
    res.end("post operation not supported on /dishes/"+req.params.dishId);
})

.put((req,res,next)=>
{   
    Dishes.findByIdAndUpdate(req.params.dishId,{$set:req.body},{new:true})
    .then((dishes)=>
    {
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
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
    Dishes.findByIdAndRemove(req.params.dishId)
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


module.exports=dishRoute;