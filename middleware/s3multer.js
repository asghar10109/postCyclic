const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

// Configure AWS credentials and region
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION, // Change this to your desired region
});

const s3 = new AWS.S3();

const bucketStorage = multerS3({
    s3: s3,
    acl: "public-read",
    bucket: process.env.BUCKET,
    key: function (req, file, cb) {
        // req.filename = file.fieldname + "-" + Date.now() + `.${file.originalname.split(".").pop()}`;
        // cb(null, file.fieldname + "-" + Date.now() + `.${file.originalname.split(".").pop()}`);
        console.log("file",file);
        cb(null, Date.now() + "_" + file.originalname);
    },
});

const ProfilePicUpload = multer({
    // storage: profilePicStorage,
    storage: bucketStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Invalid File Format: Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

module.exports = { bucketStorage , ProfilePicUpload };