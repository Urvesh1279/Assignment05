const  {getDBConnection}  = require('../utils')
const libMongoDB = require('mongodb')


const getAllproducts = (req,res,next)=>{
    
    getDBConnection().then(async (shoping)=>{
        const productsData=await shoping.collection("product").find().toArray()
        console.log(productsData)
        res.status(200).json({"data":productsData})

    }).catch((e)=>{
        console.log("Error")
        res.status(500).json({"error":"failed to load data"})
    });

}

const getSingleproduct = (req,res,next)=>{

    getDBConnection().then(async (shoping)=>{
        const searchId=req.params.id;
        const foundproduct = await shoping.collection("products").findOne({_id:new libMongoDB.ObjectId(searchId)})
        res.status(200).json({"data":foundproduct})

    }).catch((e)=>{
        console.log(e+"Error")
        res.status(500).json({"error":"failed to load data"})
    })


}

const createproduct = (req,res,next)=>{

    getDBConnection().then(async (shoping)=>{
        await shoping.collection("products").insertOne(req.body)
        res.status(200).json({"success":"data inserted"})
    }).catch((e)=>{
        console.log("Error")
        res.status(500).json({"error":"failed to save data"})
    });
}

const updateproduct = (req,res,next)=>{
    const updateId=req.params.id;
    getDBConnection().then(async (shoping)=>{
        await shoping.collection("products").updateOne({_id:new libMongoDB.ObjectId(updateId)},{$set:req.body})
        res.status(200).json({"success":"data updated"})
    }).catch((e)=>{
        console.log("Error")
        res.status(500).json({"error":"failed to update data"})
    });


}

const deleteproduct = (req,res,next)=>{
    const deleteId=req.params.id;
    getDBConnection().then(async (shoping)=>{
        await shoping.collection("products").deleteOne({_id:new libMongoDB.ObjectId(deleteId)})
        res.status(200).json({"success":"data deleted"})
    }).catch((e)=>{
        console.log("Error")
        res.status(500).json({"error":"failed to delete data"})
    });
}

const routesproduct={
    getAllproducts:getAllproducts,
    getSingleproduct:getSingleproduct,
    createproduct:createproduct,
    updateproduct:updateproduct,
    deleteproduct:deleteproduct

}


module.exports.routesproduct=routesproduct
