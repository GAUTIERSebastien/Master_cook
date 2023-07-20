// routes/app.routes.js

const router = require('express').Router();
const {
  homeCtrl,
  recipesCtrl,
  deleteCtrl
} = require('../controllers/app.ctrl');
const {
  updateRecipeCtrl,
  updateIngredientsCtrl,
} = require('../controllers/recipes.ctrl.js');

router.get('/home', homeCtrl);
router.get('/recipes', recipesCtrl);
router.delete('/recipes/delete/:id', deleteCtrl);
router.post('/recipes/:recipeId', updateRecipeCtrl);
router.put('/recipes/:recipeId', updateRecipeCtrl);
router.post('/ingredients/:recipeId', updateIngredientsCtrl);
router.post('/recipes/update/:recipeId', updateRecipeCtrl);

module.exports = router;
