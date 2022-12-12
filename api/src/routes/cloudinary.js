const { Router } = require("express");
const router = Router();
require("dotenv").config();
const { cloudinary } = require("./Utils/CludinarySettings.js");

router.post("/", async (req, res) => {
  try {
    let imageBase64 = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(imageBase64, {
      upload_preset: "ExoOtaku",
    });
    res.send(uploadedResponse.url);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
