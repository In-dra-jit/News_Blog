const NewsModel=require('../models/new.model.js');
const CategoryModel=require('../models/category.model.js');
const UserModel=require('../models/user.model.js');
const fs=require('fs');
const path=require('path');

const allNews=async(req,res)=>{
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
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}
const addNewsPage=async(req,res)=>{
    const catagories=await CategoryModel.find({});
    res.render('admin/articles/create',{role:req.role,catagories});
}
const addNews=async(req,res)=>{
    try{
        const news=new NewsModel({...req.body,author:req.id});
        if(req.file){
            news.image=req.file.path;
        }
        await news.save();
        res.redirect('/admin/articles');
    }catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
       
    }

}


const updateNewsPage=async(req,res)=>{
    const id=req.params.id;
    try {
        const article=await NewsModel.findById(id)
                                    .populate('category','name')
                                    .populate('author','fullname');
         if(!article){
            return res.status(400).send("No article Found");
        }

        if(req.role==='author') {
            if(article.author._id.toString()!==req.id){
                return res.status(400).send("Access Denied");
            }

        } 

        const catagories=await CategoryModel.find({});    
        res.render('admin/articles/update',{role:req.role,article,catagories});
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}
const updateNews=async(req,res)=>{
    const id=req.params.id;
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
        console.log(error);
        res.status(500).send('Internal Server Error');
    }


}
const deleteNews = async (req, res) => {
    const id = req.params.id;
    try {
        const article = await NewsModel.findById(id);
        if (!article) {
            return res.status(404).json({ success: false, message: "Article not found" });
        }

        // Author permission check
        if (req.role === 'author') {
            if (article.author._id.toString() !== req.id) {
                return res.status(400).send("Access Denied");
            }
        }

        // Delete associated image file
        if (article.image) {
            const imagePath = path.join(__dirname, '..', 'public', 'uploads', article.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await NewsModel.findByIdAndDelete(id);

        res.json({ success: true, message: "Article deleted successfully" });

    } catch (error) {
        console.error("Error deleting article:", error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
module.exports={
    allNews,
    addNewsPage,
    addNews,
    updateNewsPage,
    updateNews,
    deleteNews
}
