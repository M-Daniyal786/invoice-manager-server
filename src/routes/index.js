const express = require("express");
const invoiceRoute = require("./invoice/invoice.route");

const router = express.Router();

router.use("/", invoiceRoute);
module.exports = router;
