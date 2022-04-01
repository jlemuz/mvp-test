const router = require('express').Router();

//takes the .api directory
const apiRoutes = require('./api');

//appends /api to the routes in the ./api directory, which are defined in the
//api/index.js file, which countains routes that themselves are
//prefixed with users
//api/users/
//api/users/1
router.use('/api', apiRoutes);


router.use((req, res) => {
  res.status(404).end();
});


module.exports = router;