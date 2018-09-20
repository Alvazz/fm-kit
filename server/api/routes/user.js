const express = require("express")
const router = express.Router()

const UserController = require('../controllers/user')
const checkAuth = require('../middleware/check-auth')

router.post("/register", UserController.user_signup)

router.post("/login", UserController.user_login)

router.delete("/:userId", checkAuth, UserController.user_delete)

router.get("/user-list", checkAuth, UserController.user_list)

router.get("/:userId", checkAuth, UserController.user_profile)

router.patch("/:userId",  UserController.user_update_profile)

module.exports = router;
