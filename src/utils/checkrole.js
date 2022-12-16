const { permissionService } = require("../services/");

const check = (req, res, next, checkRole) => {
  console.log(checkRole);
  console.log("in check ");
  next();
};

module.exports = { check };
