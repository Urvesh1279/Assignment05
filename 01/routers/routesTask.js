const  {getDBConnection}  = require('../utils')
const libMongoDB = require('mongodb')


const getAlltasks = (req,res,next)=>{
    
    getDBConnection().then(async (taskmangement)=>{
        const tasksData=await taskmangement.collection("task").find().toArray()
        console.log(tasksData)
        res.status(200).json({"data":tasksData})

    }).catch((e)=>{
        console.log("Error")
        res.status(500).json({"error":"failed to load data"})
    });

}

const getSingletask = (req,res,next)=>{

    getDBConnection().then(async (dbToDo)=>{
        const searchId=req.params.id;
        const foundtask = await dbToDo.collection("tasks").findOne({_id:new libMongoDB.ObjectId(searchId)})
        res.status(200).json({"data":foundtask})

    }).catch((e)=>{
        console.log(e+"Error")
        res.status(500).json({"error":"failed to load data"})
    })


}

const createtask = (req,res,next)=>{

    getDBConnection().then(async (dbToDo)=>{
        await dbToDo.collection("tasks").insertOne(req.body)
        res.status(200).json({"success":"data inserted"})
    }).catch((e)=>{
        console.log("Error")
        res.status(500).json({"error":"failed to save data"})
    });
}

const updatetask = (req,res,next)=>{
    const updateId=req.params.id;
    getDBConnection().then(async (dbToDo)=>{
        await dbToDo.collection("tasks").updateOne({_id:new libMongoDB.ObjectId(updateId)},{$set:req.body})
        res.status(200).json({"success":"data updated"})
    }).catch((e)=>{
        console.log("Error")
        res.status(500).json({"error":"failed to update data"})
    });


}

const deletetask = (req,res,next)=>{
    const deleteId=req.params.id;
    getDBConnection().then(async (dbToDo)=>{
        await dbToDo.collection("tasks").deleteOne({_id:new libMongoDB.ObjectId(deleteId)})
        res.status(200).json({"success":"data deleted"})
    }).catch((e)=>{
        console.log("Error")
        res.status(500).json({"error":"failed to delete data"})
    });
}

const routesTask={
    getAlltasks:getAlltasks,
    getSingletask:getSingletask,
    createtask:createtask,
    updatetask:updatetask,
    deletetask:deletetask

}


module.exports.routesTask=routesTask
