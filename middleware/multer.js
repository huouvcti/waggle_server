const multer = require('multer');

const fileFilter = (req, file, cb) => {
    // 확장자 필터링
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/gif"
    ) {
      cb(null, true); // 해당 mimetype만 받겠다는 의미
    } else {
      // 다른 mimetype은 저장되지 않음
      req.fileValidationError = "jpg,jpeg,png,gif 파일만 업로드 가능합니다.";
      cb(null, false);
    }
  };


const upload = (dir) =>{
    return multer ({
        storage: multer.diskStorage({
            // 폴더위치
            destination(req, file, done) {
                done(null, `public/images/${dir}`);
            },
            filename: (req, file, done) => {
                const fileName = file.originalname;
                done(null, fileName);
            },
        }),
        fileFilter: fileFilter
    })
}  

const imgRename = function(imgFile, key) {
    let img = {
        type: (imgFile.originalname).split('.')[1],
        dir: imgFile.destination
    }
    img.name = key + '.'+img.type;
    return img;
}


const testUpload = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/images/pair_photo');
    },
    filename(req, file, cb) {
        cb(null, file.originalname);
    },
});

const uploadAction = multer({ 
    storage: testUpload
});


module.exports = {
    upload,
    imgRename,
    uploadAction
}