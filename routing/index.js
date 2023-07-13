//On appelle les routes 

const router = require('express').Router();
const appRoutes = require('./app.routes');
// const apiRoutes = require('./api.routes');

router.use(appRoutes);
// router.use(apiRoutes);

router.get('*', (req, res) => res.redirect('/home'));

module.exports = router;