const multer = require('multer');
const path = require('path');   

const Storage = multer.diskStorage({
    destination: 'upload',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});


const upload = multer({
    storage: Storage,
}).single("testImage");

module.exports = upload;