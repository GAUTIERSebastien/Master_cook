const router = require('express').Router();
const {
    homeCtrl,
    recipesCtrl
} = require('../controllers/app.ctrl');

router.get('/home', homeCtrl);
router.get('/recipes', recipesCtrl )

module.exports = router;