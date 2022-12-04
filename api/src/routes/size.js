const { Router } = require("express");
const router = Router();
const {
  getAllSizes,
  createNewSize,
  deleteSize,
  filtradoSize
} = require("./Controllers/sizesController");

router.get("/", async (req, res) => {
  try {
    const allSizes = await getAllSizes();
    res.json(allSizes);
  } catch (error) {
    res.send(error);
  }
});


router.post("/", async (req, res) => {
  try {
    let { size } = req.body;
    const [newSize, created] = await createNewSize(size);
    created ? res.json(newSize) : res.json(`${size} already exist`);
  } catch (error) {
    res.send(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let response = await deleteSize(id);
    res.status(200).send(response);
  } catch (error) {
    console.error({ error: error });
    return res.status(404).send(error.message);
  }
});

module.exports = router;
