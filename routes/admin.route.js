const express = require('express');
const router = express.Router();
const{loginPage,adminLogin,logout,dashboard,settings,saveSetting}=require('../controllers/user.controller.js');
const{alluser,addUserPage,addUser,updateUserPage,updateUser,deleteUser}=require('../controllers/user.controller.js');
const{allCategory,addCategoryPage,addCategory,updateCategoryPage,updateCategory,deleteCategory}=require('../controllers/category.controller.js');
const{allNews,addNewsPage,addNews,updateNewsPage,updateNews,deleteNews}=require('../controllers/article.controller.js');
const{allComments}=require('../controllers/comment.controller.js');
const isLoggedin=require('../middleware/isLoggedin.js');
const isAdmin=require('../middleware/isadmin.js');
const upload=require('../middleware/multer.js');
const isValidation=require('../middleware/Validation .js');
//Login
router.get('/',loginPage);
router.post('/index',isValidation.LoginForm,adminLogin);
router.get('/logout',isLoggedin,logout);
router.get('/dashboard',isLoggedin,dashboard);
router.get('/settings',isLoggedin,isAdmin,settings);
router.post('/save-settings',isLoggedin,isAdmin,upload.single('website_logo'),saveSetting);

//User
router.get('/users',isLoggedin,isAdmin,alluser);
router.get('/add-user',isLoggedin,isAdmin,addUserPage);
router.post('/add-user',isLoggedin,isAdmin,addUser);
router.get('/update-user/:id',isLoggedin,isAdmin,updateUserPage);
router.post('/update-user/:id',isLoggedin,isAdmin,updateUser);
router.delete('/delete-user/:id',isLoggedin,isAdmin,deleteUser);


//Category 
router.get('/category',isLoggedin,isAdmin,allCategory);
router.get('/add-category',isLoggedin,isAdmin,addCategoryPage);
router.post('/add-category',isLoggedin,isAdmin,addCategory);
router.get('/update-category/:id',isLoggedin,isAdmin,updateCategoryPage);
router.post('/update-category/:id',isLoggedin,isAdmin,updateCategory);
router.get('/delete-category/:id',isLoggedin,isAdmin,deleteCategory);

//Article
router.get('/articles',isLoggedin,allNews);
router.get('/add-article',isLoggedin,addNewsPage);
router.post('/add-article',isLoggedin,upload.single('image'),addNews);
router.get('/update-article/:id',isLoggedin,updateNewsPage);
router.post('/update-article/:id',isLoggedin,upload.single('image'),updateNews);
router.get('/delete-article/:id',isLoggedin,deleteNews);

//show comments
router.get('/comments',isLoggedin,allComments);


//404 Middleware
router.use(isLoggedin,(req, res,next ) => {
        res.status(404).render('admin/404',{
            message:"Page Not Found",
            role:req.role
        })
    })




    
//500 Middleware
router.use(isLoggedin,(err,req, res,next ) => {
        console.error(err.stack);
        const status=err.status || 500;
        const view=status===400?'admin/400':'admin/500';
        res.status(status).render(view,{
            message:err.message || 'Something Went wrong , please try again later',
            role:req.role
        })
    })


module.exports = router