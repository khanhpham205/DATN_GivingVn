require('dotenv').config()
const Danhmuc = require("../models/M_danhmuc");

const addDanhMuc = async(req,res)=>{
    const {name,desc} = req.body

    if(!name,!desc) {return res.status(400).json({Error:'vui lòng nhập đủ thông tin'})}
    if(!req.admin)  {return res.status(401).json({Error:'Bạn không có quyền thay đổi nội dung này'})}
    try{
        await Danhmuc.create({name,desc})
        return res.status(200).json({})
    }catch(error){return res.status(500).json({status:false, error })}
}

const editDanhMuc = async(req,res)=>{
    const {id,name,desc} = req.body

    if(!id,!name,!desc) {return res.status(400).json({Error:'vui lòng nhập đủ thông tin'})}
    if(!req.admin)  {return res.status(401).json({Error:'Bạn không có quyền thay đổi nội dung này'})}
    try{
        await Danhmuc.findByIdAndUpdate(id,{name,desc})
        return res.status(200).json({})
    }catch(error){return res.status(500).json({status:false, error })}
}

const delDanhMuc = async(req,res)=>{
    const {id} = req.body

    if(!id)         {return res.status(400).json({Error:'vui lòng nhập đủ thông tin'})}
    if(!req.admin)  {return res.status(401).json({Error:'Bạn không có quyền thay đổi nội dung này'})}

    try{
        // const catalogs = await Danhmuc.aggregate([
        //     {
        //         $lookup: {
        //             from: "chien",
        //             let: { catalogId: "$_id" },
        //             pipeline: [
        //                 {
        //                     $match: {
        //                         $expr: { $eq: ["$catalog", "$$catalogId"] }
        //                     }
        //                 }
        //             ],
        //             as: "books"
        //         }
        //     },
        //     {
        //         $project: {
        //             name: 1,
        //             desc: 1,
        //             countbook: { $size: "$books" }
        //         }
        //     }
        // ]);
        return res.status(200).json({})
    }catch(error){return res.status(500).json({status:false, error })}
}

const getDanhMuc = async(req,res)=>{
    try{
        const newDM = await Danhmuc.find({})

        return res.status(200).json(newDM)
    }catch(error){return res.status(500).json({status:false, error})}
}




module.exports = {
    getDanhMuc,
    addDanhMuc,
    editDanhMuc,
    delDanhMuc,
}
