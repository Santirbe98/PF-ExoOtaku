const { Router } = require("express");
const axios = require("axios");
const { Color } = require("../db");
const { Op } = require("sequelize");
const router = Router();

router.get("/", async (req, res) => {
  try {
    let result = await Color.findAll();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).send("Color not found");
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    let result = await Color.findByPk(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error({ error: error });
    return res.status(404).send("Color not found");
  }
});

router.post("/", async (req, res) => {
  const { color } = req.body;
  try {
    if (typeof color === "string") {
      let newColor = await Color.create({
        color: color,
      });
      res.status(201).json(newColor);
    }
  } catch (error) {
    console.error({ error: error.message });
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
