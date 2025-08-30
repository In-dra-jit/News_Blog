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

    const categoriesInUse=await NewsModel.distinct('category');
    const categories=await CategoryModel.find({'_id':{$in:categoriesInUse}});
    
    //res.json({news,categories});

    
    res.render('index',{news,categories});
}
const articleBycategory=async(req,res)=>{
   const category = await CategoryModel.findOne({ slug: req.params.name });

    if(!category){
        return res.status(400).send("No category Found");
    }
     const news=await NewsModel.find({category:category._id})
    .populate('category',{'name':1,'slug':1})
    .populate('author','fullname')
    .sort({createdAt:-1})
    .limit(5);

    const categoriesInUse=await NewsModel.distinct('category');
    const categories=await CategoryModel.find({'_id':{$in:categoriesInUse}});

    res.render('category',{news,categories});
}
const singleArticle=async(req,res)=>{
   const news=await NewsModel.find({})
    .populate('category',{'name':1,'slug':1})
    .populate('author','fullname')
    .sort({createdAt:-1})
    .limit(5);

    const categoriesInUse=await NewsModel.distinct('category');
    const categories=await CategoryModel.find({'_id':{$in:categoriesInUse}});

    res.render('single',{news,categories});
}
const search=async(req,res)=>{
    const singleNews=await NewsModel.findById(req.params.id)   
    .populate('category',{'name':1,'slug':1})
    .populate('author','fullname')
    .sort({createdAt:-1})
    .limit(5);

    const categoriesInUse=await NewsModel.distinct('category');
    const categories=await CategoryModel.find({'_id':{$in:categoriesInUse}});

    res.render('search',{singleNews,categories});
}
const author=async(req,res)=>{
    const news=await NewsModel.find({author:req.params.name})
    .populate('category',{'name':1,'slug':1})
    .populate('author','fullname')
    .sort({createdAt:-1})
    .limit(5);

    const categoriesInUse=await NewsModel.distinct('category');
    const categories=await CategoryModel.find({'_id':{$in:categoriesInUse}});

    res.render('author',{news,categories});
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