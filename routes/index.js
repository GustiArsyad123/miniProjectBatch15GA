const route = require("express").Router();
const passport = require("passport")
const { Users, Picture } = require("../controllers/index")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")
// const auth = require("../middleware/auth")

route.post("/login", Users.login)
route.post("/user", Users.createUser)
// route.use(passport.initialize())

route.use(authentication)

route.get("/user/:id", Users.getUserDetail)
route.put("/user/update", Users.updateUser);
route.delete("/user/:id", authorization, Users.deleteUser)
//route.put("/user/:id", authorization, Users.updateUser)

module.exports = route
