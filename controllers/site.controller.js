const moongose = require('mongoose');
const CategoryModel=require('../models/category.model.js');
const NewsModel=require('../models/new.model.js');
const CommentModel=require('../models/comments.model.js');
const UserModel=require('../models/user.model.js');




const index=async(req,res)=>{
    res.render('index');
}
const articleBycategory=async(req,res)=>{
    res.render('category');
}
const singleArticle=async(req,res)=>{
    res.render('single');
}
const search=async(req,res)=>{
    res.render('search');
}
const author=async(req,res)=>{
    res.render('author');
}
const addcomment=async(req,res)=>{
    
}

module.exports={
    index,
    articleBycategory,
    singleArticle,
    search,
    author,
    addcomment
}