const httpStatus = require("http-status");
const { invoiceService} = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

const createInvoice = catchAsync(async (req, res) => {
  console.log(req.body);
  const invoice = await invoiceService.createInvoice(req.body);
  // const body = { password: req.body.password, email: req.body.email };
  // await mailService.userCreated(body);
  res.status(httpStatus.CREATED).send(invoice);
});

const deleteInvoice = catchAsync(async (req, res) => {
  const invoice = await invoiceService.deleteInvoiceById(req.params.id);
  res.status(200).send(invoice);
});

const getInvoiceById = catchAsync(async (req, res) => {
  const invoice = await invoiceService.getInvoiceById(req.params.id);
  res.status(200).send(invoice);
  //res.status(200).json("chal puttar tu chutti kar");
});

const getAllInvoice = catchAsync(async (req, res) => {
  // const options = pick(req.query, ["sortBy", "limit", "page"]);
  const options = pick(req.query, ["pageNumber", "pageSize"]);
  const result = await invoiceService.queryInvoice(options);
  res.status(200).send(result);
});

const updateInvoiceById = catchAsync(async (req, res) => {
  const user = await invoiceService.updateInvoiceById(req.params.id, req.body);
  res.status(200).send(user);
});


module.exports = {
  createInvoice,
  deleteInvoice,
  getInvoiceById,
  getAllInvoice,
  updateInvoiceById
};
