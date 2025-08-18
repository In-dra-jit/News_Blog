const {body}=require("express-validator");
const LoginForm=[
body("username")
.notEmpty().withMessage("Username is required")
.trim()
.matches(/^[a-zA-Z]{3,10}$/).withMessage("Username must be alphabet and between 3 and 10 characters long")
.isLength({min:3,max:10}).withMessage("Username must be at least 3 characters long"),


body("password")
.notEmpty().withMessage("Password is required")
.isLength({min:4}).withMessage("Password must be at least 4 characters long")
.trim()
]





module.exports={LoginForm}