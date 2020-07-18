const express=require("express");
const bodyParser=require("body-parser");
const Dishes=require("../models/dishes");
var authenticate=require("../authenticated")
const cors = require('./cors');


const dishRoute=express.Router();
dishRoute.use(bodyParser.json());

dishRoute.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors ,(req,res,next)=>
{
   Dishes.find({})
   .populate(comments.author)
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

.post(cors.corsWithOptions,authenticate.verifyuser,authenticate.verifyadmin,(req,res,next)=>
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

.put(cors.corsWithOptions,authenticate.verifyuser,authenticate.verifyadmin,(req,res,next)=>
{   res.statusCode=403;
    res.end("cannot put the information");
})

.delete(cors.corsWithOptions,authenticate.verifyuser,authenticate.verifyadmin,(req,res,next)=>
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

dishRoute.route('/:dishId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,(req,res,next)=>
{
    Dishes.findById(req.params.dishId)
    .populate(comments.author)
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

.post(cors.corsWithOptions,authenticate.verifyuser,authenticate.verifyadmin,(req,res,next)=>
{
    res.statusCode=403;
    res.end("post operation not supported on /dishes/"+req.params.dishId);
})

.put(cors.corsWithOptions,authenticate.verifyuser,authenticate.verifyadmin,(req,res,next)=>
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

.delete(cors.corsWithOptions,authenticate.verifyuser,authenticate.verifyadmin,(req,res,next)=>
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



dishRoute.route('/:dishId/comments')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,(req,res,next)=>
{
   Dishes.findById(req.params.dishId)
   .populate('comments.author')
   .then((dish)=>
   {
    if(dish!= null)
    {
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish.comments);
    }
    else
    {
        const err=new Error("Dish "+dish.params.dishId+"not found");
        err.status=404;
        next(err);
    }
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

.post(cors.corsWithOptions,authenticate.verifyuser, authenticate.verifyadmin,(req,res,next)=>
{

    Dishes.findById(req.params.dishId)
    .then((dish)=>
    {

    if(dish!= null)
    {
        req.body.author=req.user._id;
        dish.comments.push(req.body);
        dish.save()
        .then((dish)=>
        {
            Dishes.findById(dish._id)
            .populate("comments.author")
            .then((dish)=>
            {
            res.statusCode=200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments);
            })
            
        }) 
    }
    else
    {
        const err=new Error("Dish "+dish.params.dishId+"not found");
        err.status=404;
        next(err);
    }
    },(err)=>
    {
        next(err);
    })
    .catch((err)=>
    {
        next(err);
    })
})

.put(cors.corsWithOptions,authenticate.verifyuser,authenticate.verifyadmin,(req,res,next)=>
{   res.statusCode=403;
    res.end("cannot proceed the put on "+req.params.dishId);
})

.delete(cors.corsWithOptions,authenticate.verifyuser,authenticate.verifyadmin,(req,res,next)=>
{
    Dishes.findById(req.params.dishId)
    .then((dish)=>
    {
       if(dish!=null)
       {
           for (var i=dish.comments.length-1;i>=0;i--)
           {
            dish.comments.id(dish.comments[i]._id).remove();
           }
           dish.save()
           .then((dish)=>
           {
            res.statusCode=200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
           })
       }
    },(err)=>
    {
        next(err);
    })
    .catch((err) => next(err));
})

dishRoute.route('/:dishId/comments/:commentId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,(req,res,next)=>
{
    Dishes.findById(req.params.dishId)
    .populate("comments.author")
    .then((dish)=>
    {
    if(dish!= null && dish.comments.id(req.params.commentId) != null)
    {
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish.comments.id(req.params.commentId));
    }
    else if(dish.comments!=null)
    {
        const err=new Error("comments "+dish.params.dishId+"not found");
        err.status=404;
        next(err);
    }
    else
    {
        const err=new Error("Dish "+dish.params.commentId+"not found");
        err.status=404;
        next(err);
    }
    },(err)=>
     {
         next(err);
     })
     .catch((err)=>
     {
         next(err);
     })
 })

.post(cors.corsWithOptions,authenticate.verifyuser,authenticate.verifyadmin,(req,res,next)=>
{
    res.statusCode=403;
    res.end("post operation not supported on /dishes/"+req.params.dishId+"/comments"+req.params.commentId);
})

.put(cors.corsWithOptions,authenticate.verifyuser,authenticate.verifyadmin,(req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            if (req.body.rating) {
                dish.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.comment) {
                dish.comments.id(req.params.commentId).comment = req.body.comment;                
            }
            dish.save()
            .then((dish) => {
                Dishes.findById(dish._id)
                .populate("comments.author")
                .then((dish)=>
                {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish.comments.id(req.params.commentId));  
                })
                              
            }, (err) => next(err));
        }
        else if (dish == null) {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions,authenticate.verifyuser,authenticate.verifyadmin,(req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            dish.comments.id(req.params.commentId).remove();
            dish.save()
            .then((dish) => {
                Dishes.findById(dish._id)
                .populate("comments.author")
                .then((dish)=>
                {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);                
                })
                
            }, (err) => next(err));
        }
        else if (dish == null) {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports=dishRoute;