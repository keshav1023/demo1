import Data from "../model/dataModel.js";
import path from 'path';
import fs from "fs";

export const create = async(req, res)=>{
    try {

        const orderData = new Data(req.body);

        if(!orderData){
            return res.status(404).json({msg: "order data not found"});
        }

        await orderData.save();
        res.status(200).json({msg: "Order added successfully"});

    } catch (error) {
        res.status(500).json({error: error});
    }
}


export const getAll = async(req, res) =>{
    try {

        const orderData = await Data.find();
        if(!orderData){
            return res.status(404).json({msg:"Order data not found"});
        }
        res.status(200).json(orderData);
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}

// export const getAllView = async(req, res) =>{
//     try {
//         const orderData = await Data.find();
//         if (!orderData || orderData.length === 0) {
//             return res.status(404).json({ msg: "Order data not found" });
//         }
    
//         const finalViewData = orderData.map(item => {
//             const logJson = item.Log_Json['L20 : Application - JEP'];
//             const jepValidation = logJson.jepValidation;
//             let lastTrueKey = null;
//             for (const key in jepValidation) {
//                 if (jepValidation.hasOwnProperty(key) && jepValidation[key] === true) {
//                     lastTrueKey = key;
//                 }
//             }
//             return {
//                 lastMile: logJson.jepInput.lastMile,
//                 product: logJson.jepInput.product,
//                 ...logJson.jepOutput,
//                 status: lastTrueKey // Append last true key
//             };
//         });
    
//         res.status(200).json(finalViewData);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

export const getAllView = async(req, res) =>{
    try {
        const { product, lastMile, status } = req.query; // Assuming 'product' is passed as a query parameter

        let query = {};
        if (product) {
            query['Log_Json.L20 : Application - JEP.jepInput.product'] = product;
        }

        if (lastMile) {
            query['Log_Json.L20 : Application - JEP.jepInput.lastMile'] = lastMile;
        }

        if( status ){
            query['Log_Json.L20 : Application - JEP.jepValidation.status'] = status;
        }
        
        const orderData = await Data.find(query);
        
        if (!orderData || orderData.length === 0) {
            return res.status(404).json({ msg: "Order data not found" });
        }
        
        const finalViewData = orderData.map(item => {
            const logJson = item.Log_Json['L20 : Application - JEP'];
            const jepValidation = logJson.jepValidation;
            let lastTrueKey = null;
            for (const key in jepValidation) {
                if (jepValidation.hasOwnProperty(key) && jepValidation[key] === true) {
                    lastTrueKey = key;
                }
            }
            return {
                lastMile: logJson.jepInput.lastMile,
                product: logJson.jepInput.product,
                ...logJson.jepOutput,
                status: lastTrueKey // Append last true key
            };
        });

        res.status(200).json(finalViewData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getOne = async(req, res) =>{
    try {

        const id = req.params.id;
        const orderExist = await Data.findById(id);
        if(!orderExist){
            return res.status(404).json({msg: "Order not found"});
        }
        res.status(200).json(orderExist);
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


export const update = async(req, res) =>{
    try {

        const id = req.params.id;
        const orderExist = await Data.findById(id);
        if(!orderExist){
            return res.status(401).json({msg:"Order not found"});
        }

        const updatedOrder = await Data.findByIdAndUpdate(id, req.body, {new:true});
        res.status(200).json(updatedOrder);
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


export const deleteOrder = async(req, res) =>{
    try {

        const id = req.params.id;
        const orderExist = await Data.findById(id);
        if(!orderExist){
            return res.status(404).json({msg: "Order not exist"});
        }
        await Data.findByIdAndDelete(id);
        res.status(200).json({msg: "Order deleted successfully"});
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const downloadJSON = async(req,res) =>{
    // console.log(__dirname);
    try {
        const data = await Data.find();
        const filePath = path.join("//Users/keshavkumar/Downloads/UI_MERN/server/controller/", 'data.json');
        fs.writeFileSync(filePath, JSON.stringify(data));
        res.download(filePath, 'data.json');
    } catch (error) {
        console.error("Error fetching data: ", error);
        res.status(500).json({ error: "Error fetching data" });
    }   
}