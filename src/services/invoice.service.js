const httpStatus = require("http-status");
const { Invoice } = require("../models");
const ApiError = require("../utils/APIError");
/**
 * Create a user
 * @param {Object} invoiceBody
 * @returns {Promise<Invoice>}
 */
const createInvoice = async (invoiceBody) => {
  const invoice = await Invoice(invoiceBody);
  return invoice.save();
};

const queryInvoice = async ({ pageNumber, pageSize }) => {
  // const invoice = await Invoice.paginate(options);
  let pageNum = parseInt(pageNumber);
  let pageLimit = parseInt(pageSize);

  const invoice = await Invoice.find()
    .skip((pageNum - 1) * pageLimit)
    .limit(pageLimit);
  return { pageNum: pageNum, limit: pageLimit, invoice };
};

const getInvoiceById = async (id) => {
  return Invoice.findById(id);
};

/**
 * Update user by id
 * @param {ObjectId} invoiceId
 * @param {Object} invoiceBody
 * @returns {Promise<Invoice>}
 */
const updateInvoiceById = async (invoiceId, invoiceBody) => {
  console.log(invoiceId);
  console.log(invoiceBody);
  const invoice = await getInvoiceById(invoiceId);
  if (!invoice) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invoice not found");
  }
  Object.assign(invoice, invoiceBody);
  await invoice.save();
  console.log(invoice);
  return invoice;
};

/**
 * Delete user by id
 * @param {ObjectId} invoiceId
 * @returns {Promise<Invoice>}
 */

const deleteInvoiceById = async (invoiceId) => {
  const invoice = await getInvoiceById(invoiceId);
  if (!invoice) {
    throw new ApiError(httpStatus.NOT_FOUND, "invoice not found");
  }
  await invoice.remove();
  return invoice;
};

module.exports = {
  createInvoice,
  updateInvoiceById,
  deleteInvoiceById,
  queryInvoice,
  getInvoiceById,
};
