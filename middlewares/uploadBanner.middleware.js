const multer = require("multer");

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/banners");
    },
    filename(req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        cb(null, `banner-${Date.now()}.${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) cb(null, true);
    else cb(new Error("Only images"), false);
};

module.exports = multer({
    storage,
    fileFilter
});