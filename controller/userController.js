const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    try {

        const { password, email } = req.body
        const found = await User.findOne({ email })   // to check email is register or not 
        if (found) {
            return res.json({
                message: "email already exist"
            })
        }


        const hasPass = await bcrypt.hash(password, 10)

        const result = await User.create({ ...req.body, password: hasPass }) // add data from body and haspass
        res.json({ message: "user register success", result })

    } catch (error) {
        res.json({ message: "somethingwent wrong" + error })
    }
}
exports.fetchUsers = async (req, res) => {
    try {
        const token = req.headers.authorization
        if (!token) {
           return res.json({message:"provide token"})
        }
        jwt.verify(token,process.env.JWT_KEY)
        const result = await User.find()
        res.json({ message: "user fetch success", result })

    } catch (error) {
        res.json({ message: "somethingwent wrong" + error })
    }
}
exports.login = async (req, res) => {
    try {

        const { email, password } = req.body
        const result = await User.findOne({ email })

        if (!result) {
            return res.json({ message: "email is not register with us" })
        }
        const match = await bcrypt.compare(password, result.password)
        if (!match) {
            return res.json({ message: " incorrect password" })
        } 
        const token = jwt.sign({ name: "kate" }, process.env.JWT_KEY)
        res.json({ message: "login success", token })


    } catch (error) {
        res.json({ message: "somethingwent wrong login " + error })
    }
}

exports.destory = async (req, res) => {
    try {
        await User.deleteMany()
        res.json({ message: "user destroyed successfully" })
    } catch (error) {
        res.json({ message: "somethingwent wrong" + error })
    }
}

