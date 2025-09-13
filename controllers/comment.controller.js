const CommentModel=require('../models/comments.model.js');
const NewsModel=require('../models/new.model.js');
const createError=require('../utils/error-meesage.js');

const allComments=async(req,res,next)=>{
    try {
        let comments;
        if(req.role==='admin'){
         comments=await CommentModel.find()
        .populate('article','title')
        .sort({createdAt:-1});
        }else{
            const news=await NewsModel.find({author:req.id});
           const newsId=news.map(n=>n._id);
            comments=await CommentModel.find({article:{$in:newsId}}).populate('article','title').sort({createdAt:-1});
        }
        //res.json({comments});
        res.render('admin/comments',{  comments,role:req.role});

    } catch (error) {
        // console.log(error);
        // res.status(500).send(error);
        next(createError(500,"Internal Server Error"));
    }
    
}
const updateCommentStatus=async(req,res)=>{
 try {
    const comment = await CommentModel.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if(!comment){
      return next(createError('Comment not found', 404));
    }
     res.redirect('admin/comments');
    //res.json({ success: true });
  } catch (error) {
    next(createError('Error updating comment status', 500));
  }
}
const deleteComment=async(req,res)=>{
try {
    const comment = await CommentModel.findByIdAndDelete(req.params.id);
    if(!comment){
      return next(createError('Comment not found', 404));
    }
    res.json({ success: true });
  } catch (error) {
    next(createError('Error deleting comment', 500));
  }
}
module.exports={
    allComments,
    updateCommentStatus,
    deleteComment
}