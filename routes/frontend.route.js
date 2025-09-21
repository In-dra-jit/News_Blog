const express = require('express');
const router = express.Router();
const{
index,
articleBycategory,
singleArticle,
search,
author,
addcomment

}=require('../controllers/site.controller.js' );
const loadCommonData=require('../middleware/loadCommonData.js');
router.use(loadCommonData);
router.get('/',index);
router.get('/category/:name',articleBycategory);
router.get('/single/:id',singleArticle);
router.get('/search',search);
router.get('/author/:name',author);
router.post('/single/:id/comment',addcomment);


//404 Middleware
router.use((req, res,next ) => {
        res.status(404).render('404',{
            message:"Page Not Found",
        })
    })
      
    //500 Middleware
    router.use((err,req, res,next ) => {
            console.error(err.stack);
            const status=err.status || 500;
            
            res.status(status).render('errors',{
                message:err.message || 'Something Went wrong , please try again later',
                status:status
            })
        })




module.exports = router