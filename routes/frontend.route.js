const express = require('express');
const router = express.Router();
const{
index,
articleBycategory,
singleArticle,
search,
author,
addcomment

}=require('../controllers/site.controller.js');

router.get('/',index);
router.get('/category/:name',articleBycategory);
router.get('/single/:id',singleArticle);
router.get('/search',search);
router.get('/author/:name',author);
router.post('/single/:id',addcomment);



module.exports = router