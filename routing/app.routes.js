//Ici définir les routes

const router = require('express').Router();
const {homeCtrl} = require('../controllers/app.ctrl');
const {getAllRecipes} = require('../controllers/allRecipes.ctrl');

router.get('/home', homeCtrl);
router.get('/allrecipes', getAllRecipes);

module.exports = router;