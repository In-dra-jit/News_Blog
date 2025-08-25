const NewsModel=require('../models/new.model.js');
const CategoryModel=require('../models/category.model.js');
const UserModel=require('../models/user.model.js');
const fs=require('fs');
const path=require('path');
const createError=require('../utils/error-meesage.js');
const { validationResult } = require('express-validator');


const allNews=async(req,res,next)=>{
    try{
        let news;
        if(req.role==='admin'){
             news=await NewsModel.find({})
        .populate('category','name')
        .populate('author','fullname');
        //res.json({news});
        }else{
             news=await NewsModel.find({author:req.id})
           .populate('category','name').populate('author','fullname');  
        }
        
        res.render('admin/articles',{role:req.role,news});
    }catch(err){
        // console.log(err);
        // res.status(500).send('Internal Server Error');
         next(err);
    }
}
const addNewsPage=async(req,res)=>{
    const catagories=await CategoryModel.find({});
    res.render('admin/articles/create',{role:req.role,catagories,errors:0});
}
const addNews=async(req,res,next)=>{
   const errors = validationResult(req);
       if (!errors.isEmpty()) {
         const catagories=await CategoryModel.find({});
           //return res.status(400).json({ error: errors.array() });
           return  res.render('admin/articles/create',{
               role:req.role,
               catagories,
           errors:errors.array(),
           
       });
       }
    try{
        const news=new NewsModel({...req.body,author:req.id});
        if(req.file){
            news.image=req.file.path;
        }
        await news.save();
        res.redirect('/admin/articles');
    }catch(err){
        // console.log(err);
        // res.status(500).send('Internal Server Error');
        next(err);
       
    }

}


const updateNewsPage=async(req,res,next)=>{
    const id=req.params.id;
    try {
        const article=await NewsModel.findById(id)
                                    .populate('category','name')
                                    .populate('author','fullname');
         if(!article){
           // return res.status(400).send("No article Found");
           
        //    const error = new Error('Article not found');
        //     error.status = 404;
        //     return next(error);


            return next(createError(400,"No article Found"));
        
        }

        if(req.role==='author') {
            if(article.author._id.toString()!==req.id){
                return res.status(400).send("Access Denied");
            }

        } 

        const catagories=await CategoryModel.find({});    
        res.render('admin/articles/update',{role:req.role,article,catagories});
    } catch (error) {
        // console.log(error);
        // res.status(500).send('Internal Server Error');
        next(error);
    }
}
const updateNews=async(req,res,next)=>{
    const id=req.params.id;
    // const errors = validationResult(req);
    //    if (!errors.isEmpty()) {
    //     const catagories=await CategoryModel.find({});
    //        //return res.status(400).json({ error: errors.array() });
    //        return  res.render('admin/articles/update',{
    //         article:req.body,
    //         catagories,
    //         role:req.role,
    //        errors:errors.array()
    //    });
    //    }
    try {
        const article=await NewsModel.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});
        if(!article){
            return res.status(400).send("No article Found");
        }
        if(req.file){
            if(article.image){
                fs.unlinkSync(path.join(__dirname,'..',article.image));
            }
            article.image=req.file.filename;
        }
         if(req.role==='author') {
            if(article.author._id.toString()!==req.id){
                return res.status(400).send("Access Denied");
            }

        } 
        await article.save();
        res.redirect('/admin/articles');
    } catch (error) {
        // console.log(error);
        // res.status(500).send('Internal Server Error');
        next(error);
    }


}
const deleteNews = async (req, res, next) => {
    const id = req.params.id;
    try {
        const article = await NewsModel.findById(id);
        if (!article) {
            return next(createError(404, "Article not found"));
        }

        // Author permission check
        if (req.role === 'author' && article.author._id.toString() !== req.id) {
            return next(createError(403, "Access Denied"));
        }

        // Delete associated image file if it exists
        if (article.image) {
            const imagePath = path.join(__dirname, '..', article.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await NewsModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Article deleted successfully" });

    } catch (error) {
        next(error);
    }
};



module.exports = {
    allNews,
    addNewsPage,
    addNews,
    updateNewsPage,
    updateNews,
    deleteNews
}
