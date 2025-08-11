const jwt=require("jsonwebtoken");

const isLogged=async(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token) 
            return res.redirect('/admin');
    const tokenData=jwt.verify(token,process.env.JWT_SECRET);
    req.id=tokenData.id;
    req.role=tokenData.role;
    req.fullname=tokenData.fullname;
    next();
    } catch (error) {
        res.status(500).send("Unauth: Invalid Token")
    }

};

module.exports=isLogged;
