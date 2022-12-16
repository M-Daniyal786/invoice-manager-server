const { Router } = require("express");
const { invoiceController } = require("../../controllers");

const router = Router();

router
  .route("/")
  .post(invoiceController.createInvoice)
  .get(invoiceController.getAllInvoice);
router
  .route("/:id")
  .get(invoiceController.getInvoiceById)
  .delete(invoiceController.deleteInvoice)
  .patch(invoiceController.updateInvoiceById);

module.exports = router;
