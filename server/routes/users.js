const router = require('express').Router();
const controllers = require('../controllers/index');

router.post('/signUp', controllers.users.signUp);
router.post('/signIn', controllers.users.signIn);
router.post('/logout', controllers.users.logout);

module.exports = router;