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

const UserForm=[
    body("fullname")
    .notEmpty().withMessage("Fullname is required")
    .trim()
    //.matches(/^[a-zA-Z]{3,10}$/).withMessage("Fullname must be alphabet and between 3 and 10 characters long")
    .isLength({min:3}).withMessage("Fullname must be at least 3 characters long"),
    
    body("username")
    .notEmpty().withMessage("Username is required")
    .trim()
    // .matches(/^[a-zA-Z]{3,10}$/).withMessage("Username must be alphabet and between 3 and 10 characters long")
    .isLength({min:3}).withMessage("Username must be at least 3 characters long"),
    
    body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({min:4}).withMessage("Password must be at least 4 characters long")
    .trim(),

    body("role")
    .notEmpty().withMessage("Role is required")
    .isIn(["author","admin"]).withMessage("Role must be author or admin")
]

const UserUpdateForm=[
    body("fullname")
    .notEmpty().withMessage("Fullname is required")
    .trim()
   // .matches(/^[a-zA-Z]{3,10}$/).withMessage("Fullname must be alphabet and between 3 and 10 characters long")
    .isLength({min:3,max:10}).withMessage("Fullname must be at least 3 characters long"),
    

    body("password")
    .optional({checkFalsy:true})
    .isLength({min:4}).withMessage("Password must be at least 4 characters long")
    .trim(),

    body("role")
    .notEmpty().withMessage("Role is required")
    .isIn(["author","admin"]).withMessage("Role must be author or admin")

    
]

const CategoryForm=[
    body("name")
    .notEmpty().withMessage("Name is required")
    .trim()
   // .matches(/^[a-zA-Z]{3,10}$/).withMessage("Name must be alphabet and between 3 and 10 characters long")
    .isLength({min:3,max:10}).withMessage("Name must be at least 3 characters long"),

    body("description")
    .isLength({ min:3,max:100}).withMessage("Description must be at most 100 characters long")
]

const ArticleForm=[
    body("title")
    .notEmpty().withMessage("Title is required")
    .trim()
    //.matches(/^[a-zA-Z]{3,20}$/).withMessage("Title must be alphabet and between 3 and 20 characters long")
    .isLength({min:3,max:20}).withMessage("Title must be at least 3 characters long"),
    
    body("content")
    .notEmpty().withMessage("Content is required")
    .trim()
    .isLength({ min:3, max:100}).withMessage("Content must be at least 100 characters long"),

    body('category')
    .notEmpty().withMessage("Category is required"),

    body('image')
    .custom((value,{req})=>{
        if(!req.file){
            throw new Error("Image is required")
        }
        if(req.file.mimetype!=='image/jpeg' && req.file.mimetype!=='image/png'){
            throw new Error("Image must be JPEG or PNG")
        }
        if(req.file.size>1024*1024*2){
            throw new Error("Image must be less than 2MB")
        }
        return true
    }),
]




module.exports={LoginForm,UserForm,UserUpdateForm,CategoryForm,ArticleForm}