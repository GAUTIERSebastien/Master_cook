const router = require('express').Router();
const {
    homeCtrl,
    recipesCtrl,
    deleteCtrl,
    unitsCtrl



} = require('../controllers/app.ctrl');

router.get('/home', homeCtrl);
router.get('/recipes', recipesCtrl );
router.delete('/recipes/delete/:id', deleteCtrl);
router.get('/units', unitsCtrl)

module.exports = router;