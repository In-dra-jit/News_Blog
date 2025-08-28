const moongose = require('mongoose');
const CategoryModel=require('../models/category.model.js');
const NewsModel=require('../models/new.model.js');
const CommentModel=require('../models/comments.model.js');
const UserModel=require('../models/user.model.js');




const index=async(req,res)=>{
    const news=await NewsModel.find({})
    .populate('category',{'name':1,'slug':1})
    .populate('author','fullname')
    .sort({createdAt:-1})
    .limit(5);
    //res.json({news});
    res.render('index',{news});
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