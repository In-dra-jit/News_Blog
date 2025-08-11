const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Only .png and .jpeg images are allowed'), false);
    }
};

const limits = {
    fileSize: 10 * 1024 * 1024 // 10mb
};

const upload = multer({ storage: storage, fileFilter: fileFilter, limits: limits });

module.exports = upload;

