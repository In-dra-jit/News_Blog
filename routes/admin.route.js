const express = require('express');
const router = express.Router();
const{loginPage,adminLogin,logout,dashboard,settings}=require('../controllers/user.controller.js');
const{alluser,addUserPage,addUser,updateUserPage,updateUser,deleteUser}=require('../controllers/user.controller.js');
const{allCategory,addCategoryPage,addCategory,updateCategoryPage,updateCategory,deleteCategory}=require('../controllers/category.controller.js');
const{allNews,addNewsPage,addNews,updateNewsPage,updateNews,deleteNews}=require('../controllers/article.controller.js');
const{allComments}=require('../controllers/comment.controller.js');
const isLoggedin=require('../middleware/isLoggedin.js');
const isAdmin=require('../middleware/isadmin.js');
const upload=require('../middleware/multer.js');
//Login
router.get('/',loginPage);
router.post('/index',adminLogin);
router.get('/logout',isLoggedin,logout);
router.get('/dashboard',isLoggedin,dashboard);
router.get('/settings',isLoggedin,isAdmin,settings);


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


module.exports = router