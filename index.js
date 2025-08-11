//INCLUDE
const express = require('express');
const app = express();
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const mongoose = require('mongoose');
require('dotenv').config();
const frontend=require('./routes/frontend.route.js');
const admin=require('./routes/admin.route.js');
//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.set("layout", "layout");//->frontend Layout



//VIEW ENGINE
app.set('view engine', 'ejs');
//Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Database Connected'))
    .catch(err => console.log(err));
//Routes
app.use('/',frontend);


//Admin layout
app.use('/admin',(req,res,next)=>{
    res.locals.layout='admin/layout';
    next();
});//->admin layout
app.use('/admin',admin);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` Surver is running on http://localhost:${PORT}`);
});
