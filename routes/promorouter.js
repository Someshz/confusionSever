const express=require("express");
const bodyParser=require("body-parser");
const promoRoute=express.Router();
promoRoute.use(bodyParser.json());

promoRoute.route("/")
.all((req,res,next)=>
{
    res.setHeader=("Content-Type","text/json");
    next();
})

.get((req,res,next)=>
{
    res.end("we will send the information of all dishes"+req.body.name+req.body.description+"somesh")
})

.post((req,res,next)=>
{
    res.end("we will post the information of dishes"+req.body.name+req.body.description);
})

.put((req,res,next)=>
{   res.statusCode=403;
    res.end("cannot put the information");
})

.delete((req,res,next)=>
{    res.end("deleteing the information: "+req.body.name+req.body.description);
})

promoRoute.route("/:promoId")
.all((req,res,next)=>
{
    res.setHeader=("Content-Type","text/json");
    next();
})

.get((req,res,next)=>
{
    res.end("will send details of the promotion: "+req.params.promoId+" to you!")
})

.post((req,res,next)=>
{
    res.end("post operation not supported on /promos/"+req.params.promoId);
})

.put((req,res,next)=>
{   
    res.end("updating the promotion: "+req.params.promoId);
    res.end("will update the promotion: test with details: test description");
})

.delete((req,res,next)=>
{    res.end("deleteing promotion: "+req.params.promoId);
})


module.exports=promoRoute;