import express from 'express';
import {addArt,listArt, removeArt} from '../controller/artController.js';
import multer from 'multer';

const artRouter = express.Router();
// Date.now will give u time elapsed in millisecon starting from 1 Jan 1970
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb)=> {
        return cb(null, `${Date.now()}${file.originalname}`);
    },
});
const upload = multer({storage:storage})


artRouter.post('/add' , upload.single("image") , addArt);
artRouter.get('/list' , listArt);
artRouter.post('/remove' , removeArt);

export default artRouter;