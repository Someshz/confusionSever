const express=require("express");
const bodyParser=require("body-parser");
const Promos=require("../models/promotions")
var authenticate=require("../authenticated")

const promoRoute=express.Router();
promoRoute.use(bodyParser.json());

promoRoute.route("/")
.get((req,res,next)=>
{
   Promos.find({})
   .then((promos)=>
   {
    res.statusCode=200;
    res.setHeader('Content-Type', 'application/json');
    res.json(promos);
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

.post(authenticate.verifyuser,(req,res,next)=>
{
    Promos.create(req.body)
    .then((promo)=>
    {
       console.log('Dish Created ', promo);
       res.statusCode=200;
       res.setHeader('Content-Type', 'application/json');
       res.json(promo);
    },(err)=>
    {
        next(err);
    })
    .catch((err)=>
    {
        next(err);
    })
})

.put(authenticate.verifyuser,(req,res,next)=>
{   res.statusCode=403;
    res.end("cannot put the information");
})

.delete(authenticate.verifyuser,(req,res,next)=>
{
    Promos.remove({})
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

promoRoute.route("/:promoId")
.get((req,res,next)=>
{
    Promos.findById(req.params.promoId)
    .then((promos)=>
    {
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promos);
     },(err)=>
     {
         next(err);
     })
     .catch((err)=>
     {
         next(err);
     })
 })

.post(authenticate.verifyuser,(req,res,next)=>
{
    res.statusCode=403;
    res.end("post operation not supported on /dishes/"+req.params.promoId);
})

.put(authenticate.verifyuser,(req,res,next)=>
{   
    Promos.findByIdAndUpdate(req.params.promoId,{$set:req.body},{new:true})
    .then((promos)=>
    {
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promos);
     },(err)=>
     {
         next(err);
     })
     .catch((err)=>
     {
         next(err);
     })
})

.delete(authenticate.verifyuser,(req,res,next)=>
{
    Promos.findByIdAndRemove(req.params.promoId)
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


module.exports=promoRoute;