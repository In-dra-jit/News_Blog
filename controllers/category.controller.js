const CategoryModel=require('../models/category.model.js');

const allCategory=async(req,res)=>{
    const categories=await CategoryModel.find();
    res.render('admin/categories',{categories,role:req.role});
}
const addCategoryPage=async(req,res)=>{

    res.render('admin/categories/create',{role:req.role});
}
const addCategory=async(req,res)=>{

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
        return res.status(400).send("No category Found");
    }
    res.render('admin/categories/update',{category,role:req.role});
     }catch(error){
    //     res.status.send(error);
    // 
    next(error);
     }
    
}
const updateCategory=async(req,res)=>{
const id=req.params.id;
try{
    const {name,description}=req.body;
    const category=await CategoryModel.findByIdAndUpdate(id,{
        name,
        description
    },{
        new:true,
        runValidators:true
    });
    if(!category){
        return res.status(400).send("No category Found");
    }
    res.redirect('/admin/category');

}catch(error){
    // res.status.send(error);   
    next(error);
}


}
const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await CategoryModel.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).send('Category not found');
    }
    res.json({ success: true,message: "Category deleted successfully" });
  } catch (error) {
    // console.error("Error deleting category:", error);
    // res.status(500).json({ success: false, message: 'Internal Server Error' });
    next(error);;
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
