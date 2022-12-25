const Router = require("express");
const router = Router();
const {
  getAllOrders,
  getOrderDetail,
  deleteOrder,
  updateStatusOrder,
  getOrdersByUser,
} = require("./Controllers/ordersController");

router.get("/", async (req, res) => {
  const { id } = req.query;
  try {
    let result;
    if (id) {
      result = await getOrderDetail(id);
    } else {
      result = await getAllOrders();
    }
    typeof result === "string"
      ? res.status(404).send(result)
      : res.status(200).send(result);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    let ordersByUser = await getOrdersByUser(userId);
    res.send(ordersByUser);
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.put("/", async (req, res) => {
  const { id } = req.query;
  const { status } = req.body;
  try {
    let orderUpdated = await updateStatusOrder(id, status);
    typeof orderUpdated === "string"
      ? res.status(404).send(orderUpdated)
      : res.status(200).send(orderUpdated);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.delete("/", async (req, res) => {
  const { id } = req.query;
  try {
    let orderDeleted = await deleteOrder(id);
    orderDeleted === "Order not found"
      ? res.status(404).send(orderDeleted)
      : res.status(200).send(orderDeleted);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

module.exports = router;
