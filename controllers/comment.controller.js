const CommentModel=require('../models/comments.model.js');
const allComments=async(req,res)=>{
    res.render('admin/comments',{role:req.role});
}
module.exports={
    allComments
}