const express=require('express');
const router = express.Router();
const category=require('../controllers/categories.controller');
const {body,validationResult}=require("express-validator");
const validation = require("../middlewares/validation.middleware");
const authentication = require("../middlewares/authentication.middleware");
const authorization = require("../middlewares/authorization.middleware");

router.post("/",body("name")
                .notEmpty()
                .withMessage("name is require")
                .isLength({min:3})
                .withMessage("name at least 3 length")
                ,validation,authentication,authorization("admin","dev"), category.createCategory);
router.get("/", category.getCategories);
router.patch("/:categoryId",body("name")
                .notEmpty()
                .withMessage("name is require")
                .isLength({min:3})
                .withMessage("name at least 3 length")
                ,validation,authentication,authorization("admin","dev"), category.updateCategory);
router.delete("/:categoryId",authentication,authorization("admin","dev"), category.deleteCategory);

module.exports=router;