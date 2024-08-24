import path from 'path';
import multer from 'multer';

function multerfile(drr) {
    const storage = multer.diskStorage({
        destination: `./public/${drr}`,
        filename: (req, file, cb) => {
            cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
        }
    });
    return multer({ storage }).single('image'); 
}

export default multerfile;
