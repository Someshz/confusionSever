const express=require("express");
const bodyParser=require("body-parser");
const leaderRoute=express.Router();
leaderRoute.use(bodyParser.json());

leaderRoute.route("/")
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

leaderRoute.route("/:leaderId")
.all((req,res,next)=>
{
    res.setHeader=("Content-Type","text/json");
    next();
})

.get((req,res,next)=>
{
    res.end("will send details of the leader: "+req.params.leaderId+" to you!")
})

.post((req,res,next)=>
{
    res.end("post operation not supported on /leader/"+req.params.leaderId);
})

.put((req,res,next)=>
{   
    res.end("updating the leaders: "+req.params.leaderId);
    res.end("will update the leader: test with details: test description");
})

.delete((req,res,next)=>
{    res.end("deleteing leader: "+req.params.leaderId);
})

module.exports=leaderRoute;