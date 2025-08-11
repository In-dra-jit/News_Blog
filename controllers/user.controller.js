const UserModel=require('../models/user.model.js');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv').config();
const CategoryModel=require('../models/category.model.js');
const NewsModel=require('../models/new.model.js');
const SettingModel=require('../models/settings.model.js');
//Login
const loginPage=(req,res)=>{ 

    res.render('admin/login',{
        layout:false
    });
}


const adminLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (!user) {
        return res.render('admin', { error: 'User not found' });
    }

    // // Check if role is admin
    // if (user.role !== 'admin') {
    //     // return res.render('admin', { error: 'Access denied. Not an admin user.' });
    //      res.status(400).send("Access denied. Not an admin user.")
        
    // }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        return res.render('admin', { error: 'Invalid password' });
    }

    const jwtdata = { id: user._id, fullname: user.fullname, role: user.role };
    const token = jwt.sign(jwtdata, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.redirect('/admin/dashboard');
};

const logout=(req,res)=>{
    res.clearCookie('token');
    res.redirect('/admin');
 }

const dashboard = async (req, res) => { 
    try {
        let articlesCount;
        if(req.role === 'admin') {
            articlesCount = await NewsModel.countDocuments();
        } else {
            articlesCount = await NewsModel.countDocuments({ author: req.id });
        }
        //const articlesCount = await NewsModel.countDocuments();
        const usersCount = await UserModel.countDocuments();
        const categoriesCount = await CategoryModel.countDocuments();
        
        res.render('admin/dashborad', {
            role: req.role,
            fullname: req.fullname,
            articlesCount,
            usersCount,
            categoriesCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

const settings=(req,res)=>{

    res.render('admin/setting',{role:req.role});
}

const saveSetting = async (req, res) => {
    try {
        const { website_title, website_footer } = req.body;
        const website_logo = req.file ? req.file.filename : null;

        const updateData = {
            website_title,
            website_footer
        };

        if (website_logo) {
            updateData.website_logo = website_logo;
        }

        await SettingModel.updateOne({}, updateData, { upsert: true });
        res.redirect('/admin/settings');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

//User
const alluser=async(req,res)=>{ 
    const users=await UserModel.find();
    res.render('admin/users',{users,role:req.role});
}
const addUserPage=(req,res)=>{ 
    res.render('admin/users/create',{role:req.role});
}
const addUser=async(req,res)=>{

    await UserModel.create(req.body);
    res.redirect('/admin/users');
 }
const updateUserPage=async(req,res)=>{
    const id=req.params.id;
    try {
        const user=await UserModel.findById(id);
        if(!user){
            res.status(404).send('User not found');
        }
        res.render('admin/users/update',{user,role:req.role});
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
        res.redirect('/admin/users');
        
    }
 }
const updateUser=async(req,res)=>{
    const id=req.params.id;
    const{fullname,password,role}=req.body;
    try {
        const user=await UserModel.findById(id);
        if(!user){
            res.status(404).send('User not found');
        }
        user.fullname=fullname|| user.fullname;
        if(password){
                    user.password=password;

        }
        user.role=role || user.role;
        await user.save();
        res.redirect('/admin/users');
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
        
    }
 }
const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await UserModel.findByIdAndDelete(id);
    res.json({ success: true, message: "User deleted successfully" }); // ✅ Return JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' }); // ✅ Error as JSON
  }
};




module.exports={
    loginPage,
    adminLogin,
    logout,
    dashboard,
    settings,
    alluser,
    addUserPage,
    addUser,
    updateUserPage,
    updateUser,
    deleteUser,
    saveSetting
}


