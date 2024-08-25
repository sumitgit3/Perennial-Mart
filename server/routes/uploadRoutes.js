import express from 'express';
import multer from 'multer'
import path from 'path'
import { protect,admin } from '../middleware/authMiddleware.js'

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')  //path is relative to index.js
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

function fileFilter(req, file, cb) {
    const fileTypes = /jpg|jpeg|png/;   //regex expression
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if(fileTypes && mimetype) {
        cb(null,true);
    }
    else {
        cb('Images only');
    }
}

const upload = multer({ storage,fileFilter })

router.post('/',protect,admin,upload.single('image') ,(req, res) => {
    res.send({
        message:"upload Successful",
        image:`/${req.file.path}`
    })
});



export default router;