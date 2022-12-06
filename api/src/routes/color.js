const { Router } = require("express");
const router = Router();
const {
  getAllColors,
  createNewColors,
  getOneColor,
  deleteColor,
} = require("./Controllers/colorController");

router.get("/", async (req, res) => {
  try {
    let result = await getAllColors();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).send("Color not found");
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let result = await getOneColor(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error({ error: error });
    return res.status(404).send("Color not found");
  }
});

router.post("/", async (req, res) => {
  const { color } = req.body;
  try {
    let newColor = await createNewColors(color);
    res.status(200).json(newColor);
  } catch (error) {
    console.error({ error: error.message });
    res.status(500).send("Internal server error");
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let response = await deleteColor(id);
    res.status(200).send(response);
  } catch (error) {
    console.error({ error: error });
    return res.status(404).send(error.message);
  }
});

module.exports = router;
