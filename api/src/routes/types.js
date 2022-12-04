const { Router } = require("express");
const {
  getAllTypes,
  createNewType,
  deleteType,
} = require("./Controllers/typesController");
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

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let response = await deleteType(id);
    res.status(200).send(response);
  } catch (error) {
    console.error({ error: error });
    return res.status(404).send(error.message);
  }
});
module.exports = router;
