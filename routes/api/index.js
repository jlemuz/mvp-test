const router = require('express').Router();

//takes the routes defined in ./user-routes.js
const userRoutes = require('./user-routes.js');
//prefixes the endpoint with /users/
//users/1
router.use('/users', userRoutes);

module.exports = router;