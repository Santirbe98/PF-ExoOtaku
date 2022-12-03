const { Router } = require("express");
const { getAllTypes, createNewType } = require("./Controllers/typesController");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const allTypes = await getAllTypes();
    res.json(allTypes);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    let { type } = req.body;
    const [newType, created] = await createNewType(type);
    created ? res.json(newType) : res.json(`${type} already exist`);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
