// routes/app.routes.js

const router = require('express').Router();
const {
  homeCtrl,
  recipesCtrl,
} = require('../controllers/app.ctrl');
const {
  updateRecipeCtrl,
  updateIngredientsCtrl
} = require('../controllers/recipes.ctrl.js');

router.get('/home', homeCtrl);
router.get('/recipes', recipesCtrl);
router.put('/recipes/:recipeId', updateRecipeCtrl);
router.put('/ingredients/:recipeId', updateIngredientsCtrl);

module.exports = router;
