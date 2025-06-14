const express = require('express');
const { registerUser, loginUser, logoutUser, getUserDetails, forgotPassword, resetPassword, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/user_actions/auth');
const { validateSignUp } = require('../middlewares/validator');
const loginLimiter = require('../middlewares/loginLimiter');

const router = express.Router();

router.route('/register').post(validateSignUp, registerUser);
router.route('/login').post(loginLimiter, loginUser);
router.route('/logout').get(logoutUser);

router.route('/me').get(isAuthenticatedUser, getUserDetails);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

router.route('/password/update').put(isAuthenticatedUser, updatePassword);

router.route('/me/update').put(isAuthenticatedUser, updateProfile);

router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);

router.route("/admin/user/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;

