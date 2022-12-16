// const Joi = require("joi-oid");
// const { password, objectId } = require("./custom.validation");

// const createUser = {
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required().custom(password),
//     role: Joi.string(),
//     pin: Joi.number(),
//     phoneNumber: Joi.string().required(),
//     company: Joi.objectId(),
//     firstName: Joi.string().required(),
//     lastName: Joi.string().required(),
//     address: Joi.string().required(),
//     role: Joi.string(),
//     isActive: Joi.boolean(),
//     permissions: Joi.string(),
//   }),
// };

// const getUsers = {
//   query: Joi.object().keys({
//     isActive: Joi.boolean(),
//     email: Joi.string(),
//     firstName: Joi.string(),
//     lastName: Joi.string(),
//     role: Joi.string(),
//     sortBy: Joi.string(),
//     limit: Joi.number().integer(),
//     page: Joi.number().integer(),
//   }),
// };

// const getUser = {
//   params: Joi.object().keys({
//     id: Joi.objectId().required(),
//   }),
// };

// const updateUser = {
//   params: Joi.object().keys({
//     id: Joi.objectId().required(),
//   }),
//   body: Joi.object().keys({
//     email: Joi.string().email(),
//     password: Joi.string().custom(password),
//     phoneNumber: Joi.string(),
//     company: Joi.objectId(),
//     firstName: Joi.string(),
//     lastName: Joi.string(),
//     address: Joi.string(),
//     isActive: Joi.boolean(),
//   }),
// };

// const updateUserPin = {
//   params: Joi.object().keys({
//     id: Joi.objectId().required(),
//   }),
//   body: Joi.object().keys({
//     pin: Joi.number().required(),
//     pinExists: Joi.boolean().required(),
//   }),
// };

// const checkPin = {
//   body: Joi.object().keys({
//     pin: Joi.number().required(),
//   }),
// };

// module.exports = {
//   getUser,
//   getUsers,
//   createUser,
//   updateUser,
//   updateUserPin,
//   checkPin,
// };
