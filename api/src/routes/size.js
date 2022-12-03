const { Router } = require("express");
const router = Router();
const {
  getAllSizes,
  createNewSize,
  deleteSize,
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

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let sizeid = deleteSize(id);
    sizeid
      ? res.status(200).json("Size deleted successfully")
      : res.status(400).send("not found");
  } catch(error) {
    res.status(404).json(error)
  }
});
module.exports = router;
