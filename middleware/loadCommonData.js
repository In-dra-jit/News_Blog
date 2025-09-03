const CategoryModel=require('../models/category.model.js');
const NewsModel=require('../models/new.model.js');
const CommentModel=require('../models/comments.model.js');
const UserModel=require('../models/user.model.js');
const settingModel=require('../models/settings.model.js');


const loadCommonData=async(req,res,next)=>{
try {
    const settings=await settingModel.findOne();

    const latestnews=await NewsModel.find({})
    .populate('category',{'name':1,'slug':1})
    .populate('author','fullname')
    .sort({createdAt:-1}).limit(5);
    const categoriesInUse=await NewsModel.distinct('category');
    const categories=await CategoryModel.find({'_id':{$in:categoriesInUse}});
    
    res.locals.latestnews=latestnews;
    res.locals.categories=categories;
    res.locals.settings=settings;

    next();



} catch (error) {
    next(error)
}

}

module.exports=loadCommonData;