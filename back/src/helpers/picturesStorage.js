import multer from 'multer';

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'pictures');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

export const picturesStorage = multer({
    storage
});