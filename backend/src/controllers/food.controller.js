const foodModel = require('../models/fooditem.model');
const storageService = require('../services/storage.services');
const { v4: uuid } = require("uuid");

async function createfood(req, res) {
  try {
    // 🔍 DEBUG LOGS (PUT HERE)
    console.log("FILE EXISTS:", !!req.file);
    console.log("BUFFER SIZE:", req.file?.buffer?.length);

    if (!req.file) {
      return res.status(400).json({
        message: "Video file is required",
      });
    }

    if (!req.foodPartner) {
      return res.status(401).json({
        message: "Unauthorized food partner",
      });
    }

    const fileUploadResult = await storageService.uploadFile(
      req.file.buffer,
      uuid()
    );

    console.log("UPLOAD RESULT 👉", fileUploadResult);

    const foodItem = await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      video: fileUploadResult.url,
      foodPartner: req.foodPartner._id,
    });

    res.status(201).json({
      message: "Food created successfully",
      food: foodItem,
    });
  } catch (error) {
    console.error("CREATE FOOD ERROR ❌", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}


async function getfooditem(req, res) {
  try {
    const fooditems = await foodModel.find({});
    res.status(200).json({
      message: "Food items fetched successfully",
      fooditems,
    });
  } catch (error) {
    console.error("GET FOOD ERROR ❌", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  createfood,
  getfooditem,
};
