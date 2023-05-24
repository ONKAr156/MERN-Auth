const { fetchUsers, register, login, destory } = require("../controller/userController")

const router  = require("express").Router()

router
.get("/",fetchUsers)
.post("/register",register)
.post("/login",login)
.delete("/destroy",destory)


module.exports = router