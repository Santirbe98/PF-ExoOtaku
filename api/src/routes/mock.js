const { Router } = require("express");
const router = Router();
const { createNewProduct } = require("./Controllers/productsController");
const axios = require("axios");
var fs = require("fs");

async function getBase64ImageFromUrl(imageUrl) {
  let image = await axios.get(imageUrl, { responseType: "arraybuffer" });
  let returnedB64 = Buffer.from(image.data).toString("base64");
  return "data:image/png;base64," + returnedB64;
}

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    for (let j = 0; j < body.length; j++) {
      let algo = await Promise.all(
        body[j].imagesDb.map(async (i) => await getBase64ImageFromUrl(i.url))
      );

      body[j].imagesDb = algo.map((e, index) => ({
        ...body[j].imagesDb[index],
        url: e,
      }));
    }

    for (var i = 0; i < body.length; i++) {
      await createNewProduct(body[i]);
    }
    res.status(201).send(`se agregaron ${i} elementos`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
