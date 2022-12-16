const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const invoiceSchema = mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    invoiceNo: {
      type: String,
      required: true,
      trim: true,
    },
    totalAmount: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

invoiceSchema.plugin(toJSON);
// invoiceSchema.plugin(paginate);


const Invoice = mongoose.model("invoice", invoiceSchema);
module.exports = Invoice;
