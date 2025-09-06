
const CategoryModel=require('../models/category.model.js');
const NewsModel=require('../models/new.model.js');
const CommentModel=require('../models/comments.model.js');
const UserModel=require('../models/user.model.js');
const settingModel=require('../models/settings.model.js');
const moongose = require('mongoose');
const mongoose = require('mongoose');
const paginate=require('../utils/paginate.js');

const index=async(req,res)=>{
    // const news=await NewsModel.find({})
    // .populate('category',{'name':1,'slug':1})
    // .populate('author','fullname')
    // .sort({createdAt:-1})
    // .limit(5);

   const paginitData=await paginate(NewsModel,{},
    req.query,
    {
      populate:[
        {
          path:'category',
          select:'name slug'
        },
        {
          path:'author',
          select:'fullname'
        }
      ],
      
      sort: '-createdAt'});
   
   
    // const settings=await settingModel.findOne();
    // const latestnews=await NewsModel.find({})
    // .populate('category',{'name':1,'slug':1})
    // .populate('author','fullname')
    // .sort({createdAt:-1}).limit(5);
    // const categoriesInUse=await NewsModel.distinct('category');
    // const categories=await CategoryModel.find({'_id':{$in:categoriesInUse}});
    
    //res.json({news,categories});

    
    // res.render('index',{paginitData,categories,latestnews,settings});
    
res.render('index', { paginitData, category: null });
  }

const articleBycategory=async(req,res)=>{
   const category = await CategoryModel.findOne({ slug: req.params.name });

    if(!category){
        return res.status(400).send("No category Found");
    }
    //  const news=await NewsModel.find({category:category._id})
    // .populate('category',{'name':1,'slug':1})
    // .populate('author','fullname')
    // .sort({createdAt:-1})
    // .limit(5);

    // const categoriesInUse=await NewsModel.distinct('category');
    // const categories=await CategoryModel.find({'_id':{$in:categoriesInUse}});

     const paginitData=await paginate(NewsModel,{category:category._id},
    req.query,
    {
      populate:[
        {
          path:'category',
          select:'name slug'
        },
        {
          path:'author',
          select:'fullname'
        }
      ],
      
      sort: '-createdAt'});
   


    res.render('category',{paginitData,category});
}
const singleArticle = async (req, res) => {

 if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send("Invalid article ID");
    }
  const Singlenews = await NewsModel.findById(req.params.id)
    .populate('category', { name: 1, slug: 1 })
    .populate('author', 'fullname');

  if (!Singlenews) {
    return res.status(404).send("Article not found");
  }

  const categoriesInUse = await NewsModel.distinct('category');
  const categories = await CategoryModel.find({ _id: { $in: categoriesInUse } });

  
  res.render('single', { Singlenews, categories });
    
};
const search=async(req,res)=>{
  const serachQuery=req.query.search;  
  // const news=await NewsModel.find({
  //   $or: [
  //     { title: { $regex: serachQuery, $options: 'i' } },
  //     { content: { $regex: serachQuery, $options: 'i' } },
  //   ],
  // })   
  //   .populate('category',{'name':1,'slug':1})
  //   .populate('author','fullname')
  //   .sort({createdAt:-1})
  //   .limit(5);

  //   const categoriesInUse=await NewsModel.distinct('category');
  //   const categories=await CategoryModel.find({'_id':{$in:categoriesInUse}});


  const paginitData=await paginate(NewsModel,{ $or: [
    { title: { $regex: serachQuery, $options: 'i' } },
    { content: { $regex: serachQuery, $options: 'i' } },
  ]},
    req.query,
    {
      populate:[
        {
          path:'category',
          select:'name slug'
        },
        {
          path:'author',
          select:'fullname'
        }
      ],
      
      sort: '-createdAt'});

    res.render('search',{paginitData,serachQuery,category: null});
}
const author=async(req,res)=>{
  const author=await UserModel.findOne({_id:req.params.name});
  if(!author){
    return res.status(400).send("No author Found");
  }
    // const news=await NewsModel.find({author:req.params.name})
    // .populate('category',{'name':1,'slug':1})
    // .populate('author','fullname')
    // .sort({createdAt:-1})
    // .limit(5);

    // const categoriesInUse=await NewsModel.distinct('category');
    // const categories=await CategoryModel.find({'_id':{$in:categoriesInUse}});


    const paginitData=await paginate(NewsModel,{author:req.params.name},
    req.query,
    {
      populate:[
        {
          path:'category',
          select:'name slug'
        },
        {
          path:'author',
          select:'fullname'
        }
      ],
      
      sort: '-createdAt'});


    res.render('author',{paginitData,author,category: null});
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