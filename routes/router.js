const express = require("express");
const routes = require("../controller/controller.js");
const router = express.Router();

router.post("/", routes.postAccount);

router.get("/", routes.getAllAccount);
router.get("/:id", routes.getById);
router.put("/:id", routes.putById);

router.delete("/:id", routes.deleteById);

module.exports = router;
