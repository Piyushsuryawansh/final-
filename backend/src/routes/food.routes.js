const express=require('express');
const foodController= require("../controllers/food.controller");
const authMiddleware= require("../middlewares/auth.middleware");
const router=express.Router();
const multer= require('multer');

const upload=multer({
    storage: multer.memoryStorage(),
})

router.post('/',authMiddleware.authFoodPartnerMiddleware,upload.single("video"),foodController.createfood)

router.get('/', authMiddleware.authUserMiddleware, foodController.getfooditem)


module.exports=router;