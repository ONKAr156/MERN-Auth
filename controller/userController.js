const User = require("../models/User")
const bcrypt = require("bcrypt")

exports.register = async(req,res)=>{
    try {
        
        const {password} = req.body
        const hasPass = await bcrypt.hash(password,10)

 const result =  await User.create({...req.body, password:hasPass}) // add data from body and haspass
   res.json({message:"user register success", result})

    } catch (error) {
        res.json({message:"somethingwent wrong", error})
    }
}
exports.fetchUsers = async(req,res)=>{
    try {
        
 const result =  await User.find()
   res.json({message:"user fetch success", result})

    } catch (error) {
        res.json({message:"somethingwent wrong", error})
    }
}

// exports.updateUser = async(req,res)=>{
//     try {
        
//  const result =  await User.()
//    res.json({message:"user fetch success", result})

//     } catch (error) {
//         res.json({message:"somethingwent wrong", error})
//     }
// }