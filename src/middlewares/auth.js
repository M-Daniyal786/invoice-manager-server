const passport = require("passport");
const httpStatus = require("http-status");
const ApiError = require("../utils/APIError");
const { roleRights } = require("../config/roles");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { userService, permissionService } = require("../services");

const verifyCallback =
  (req, resolve, reject, requiredRights) => async (err, user, info) => {
    if (err || info || !user) {
      return reject(
        new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate")
      );
    }
    req.user = user;

    if (requiredRights.length) {
      const userRights = roleRights.get(user.role);
      const hasRequiredRights = requiredRights.every((requiredRight) =>
        userRights.includes(requiredRight)
      );
      if (!hasRequiredRights && req.params.userId !== user.id) {
        return reject(new ApiError(httpStatus.FORBIDDEN, "Forbidden"));
      }
    }

    resolve();
  };

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        "jwt",
        { session: false },
        verifyCallback(req, resolve, reject, requiredRights)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

// module.exports = async function verify(req, res, next, settedRole) {
//   console.log(settedRole);
//   const token = req.header("auth-token");
//   console.log("wow");
//   if (!token) return res.status(401).send("Access Denied");

//   try {
//     const varified = jwt.verify(token, config.jwt.secret);
//     const user = await userService.getUserById(varified.sub);
//     const permission = await permissionService.getPermissionByUserId(user.id);
//     console.log(permission);
//     req.user = user;
//     next();
//   } catch (err) {
//     res.status(400).send("Invalid Token");
//   }
// };

module.exports = verify =
  (roles = null, permission = null) =>
  async (req, res, next) => {
    // console.log("in auth");
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Access Denied");

    try {
      // console.log("in try");
      let checkedRole = false;
      let checkPermission = false;
      const varified = jwt.verify(token, config.jwt.secret);
      const user = await userService.getUserById(varified.sub);
      console.log(user, "<=== user in auth");
      if (user.role == "overlord") {
        req.user = user;
        return next();
      }
      // console.log(user.role, "<===== user role");
      if (roles) {
        // console.log("in roles params");
        roles.map((role) => {
          // console.log(role, "<==== role");
          // console.log(user.role, "<====user role ");
          if (role == user.role) {
            checkedRole = true;
          }
        });
        if (checkedRole == false) {
          return res.status(400).send("not allowed");
        }
      }
      if (permission) {
        // console.log("checking permission");
        const userPermission = await permissionService.getPermissionByUserId(
          user.id
        );
        if (!userPermission) {
          return res
            .status(400)
            .send("this user have no permissions assigned !!");
        }
        if (userPermission[permission]) checkPermission = true;
        if (checkPermission == false) {
          return res.status(400).send("This Action Is Not Allowed !!!");
        }
      }
      if (user.role != "overlord") {
        console.log("not overlord");
        if (req.body.company) {
          req.body.company = user.company;
        }
        if (req.query.company) {
          console.log("req.query.company exists");
          req.query.company = user.company;
        }
        if (req.params.company) req.params.company = user.company;
      }
      req.user = user;
      // console.log("user logged in succesfully");
      next();
    } catch (err) {
      res.status(400).send("Invalid Token");
    }
  };
