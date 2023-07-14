//Ici définir les routes


const router = require('express').Router();
const {
    homeCtrl,
    servicesCtrl,
    contactCtrl,
    recipesCtrl
} = require('../controllers/app.ctrl');

router.get('/home', homeCtrl);
router.get('/services', servicesCtrl);
router.get('/recipes', recipesCtrl )
router.get('/contact', contactCtrl);

module.exports = router;


