const multer = require("multer");
const path = require("path");
const createError = require("http-errors");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/upload");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const extFile = path.extname(file.originalname).split(".")[1];
        cb(
            null,
            file.fieldname + "-" + uniqueSuffix + "." + extFile.toLowerCase()
        );
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024, //2 MB
    },
    fileFilter: (req, file, cb) => {
        let size = +req.rawHeaders.slice(-1)[0];
        console.log(size)
        if (size > 2 * 1024 * 1024) {
            return cb(new createError(413, 'Image size too large (Max 2MB)'));
        }

        const acceptedTypeFile = ["jpg", "png", "jpeg"];

        const extFile = path.extname(file.originalname).split(".")[1];
        if (!acceptedTypeFile.includes(extFile.toLowerCase())) {
            return cb(new createError(415, 'File extensions should be jpg, jpeg, png'));
        }
        cb(null, true);
    },
});

module.exports = upload;
