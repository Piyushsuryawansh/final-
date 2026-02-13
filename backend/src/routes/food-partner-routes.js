const express=require("express");
const authMiddleware=require('../middlewares/auth.middleware');
const foodPartnerController=require('../controllers/foodPartnerController');


const router=express.Router();

router.get('/:id',foodPartnerController.getFoodPartnerById);

module.exports=router;