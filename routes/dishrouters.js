const express=require("express");
const bodyParser=require("body-parser");


const dishRoute=express.Router();
dishRoute.use(bodyParser.json());

dishRoute.route("/")
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

dishRoute.route("/:dishId")
.all((req,res,next)=>
{
    res.setHeader=("Content-Type","text/json");
    next();
})

.get((req,res,next)=>
{
    res.end("will send details of the dish: "+req.params.dishId+" to you!")
})

.post((req,res,next)=>
{
    res.end("post operation not supported on /dishes/"+req.params.dishId);
})

.put((req,res,next)=>
{   
    res.end("updating the dish: "+req.params.dishId);
    res.end("will update the dish: test with details: test description");
})

.delete((req,res,next)=>
{    res.end("deleteing dish: "+req.params.dishId);
})


module.exports=dishRoute;