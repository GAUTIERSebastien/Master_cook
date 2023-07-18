// routes/app.routes.js

const router = require('express').Router();
const {
  homeCtrl,
  recipesCtrl,
  deleteCtrl
} = require('../controllers/app.ctrl');
const {
  updateRecipeCtrl,
  updateIngredientsCtrl
} = require('../controllers/recipes.ctrl.js');

router.get('/home', homeCtrl);
router.get('/recipes', recipesCtrl);
router.delete('/recipes/delete/:id', deleteCtrl);
router.put('/recipes/:recipeId', updateRecipeCtrl);
router.put('/ingredients/:recipeId', updateIngredientsCtrl);

module.exports = router;
