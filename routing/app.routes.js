const router = require('express').Router();
const {
    homeCtrl,
    recipesCtrl,
    deleteCtrl,


} = require('../controllers/app.ctrl');

router.get('/home', homeCtrl);
router.get('/recipes', recipesCtrl );
router.delete('/recipes/delete/:id', deleteCtrl);

module.exports = router;