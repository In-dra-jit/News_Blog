const CategoryModel=require('../models/category.model.js');
const NewsModel=require('../models/new.model.js');
const createError=require('../utils/error-meesage.js');
const { validationResult } = require('express-validator');

const allCategory=async(req,res)=>{
    const categories=await CategoryModel.find();
    res.render('admin/categories',{categories,role:req.role});
}
const addCategoryPage=async(req,res)=>{

    res.render('admin/categories/create',{role:req.role,errors:0});
}
const addCategory=async(req,res,next)=>{
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            //return res.status(400).json({ error: errors.array() });
            return  res.render('admin/categories/create',{
                role:req.role,
            errors:errors.array()
        });
        }
    
    try {
        const { name, description } = req.body;
        const category = await CategoryModel.create({ name, description });
        res.redirect('/admin/category');
    } catch (error) {
        // console.error("Error adding category:", error);
        // res.status(500).send('Internal Server Error');
        next(error);
    }
}
const updateCategoryPage=async(req,res)=>{
   
    try{
        const id=req.params.id;
    const category=await CategoryModel.findById(id);
    if(!category){
        // return res.status(400).send("No category Found");
        return next(createError(400,"No Catagory Found"));
        
    }
    res.render('admin/categories/update',{category,role:req.role,errors:0});
     }catch(error){
    //     res.status.send(error);
    // 
    next(error);
     }
    
}
const updateCategory=async(req,res,next)=>{
const id=req.params.id;
const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const category=await CategoryModel.findById(id);
            return  res.render('admin/categories/update',{
               category,
                role:req.role,
            errors:errors.array()
        });
        }
try{
    const {name,description}=req.body;
    const category=await CategoryModel.findById(id);
    if(!category){
        return res.status(400).send("No category Found");
    }
    category.name=name;
    category.description=description;
    await category.save();
    res.redirect('/admin/category');

}catch(error){
    // res.status.send(error);   
    next(error);
}


}
const deleteCategory = async (req, res, next) => {
  const id = req.params.id;
  try {
    const category = await CategoryModel.findById(id);
    if (!category) {
      return next(createError('Category not found', 404));
    }

    const article = await NewsModel.findOne({ category: id });
    if (article) {
      return res.status(400).json({ success: false, message: 'Category is associated with an article' });
    }

    await category.deleteOne();
    res.json({ success: true ,message: "Category deleted successfully"});
  } catch (error) {
    // res.status(400).send(error);
    next(error)
  }
};



module.exports={
    allCategory,
    addCategoryPage,
    addCategory,
    updateCategoryPage,
    updateCategory,
    deleteCategory
}
