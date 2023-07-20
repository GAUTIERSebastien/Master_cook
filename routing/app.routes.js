const router = require('express').Router();
const {
    homeCtrl,
    recipesCtrl,
    deleteCtrl,
    updateCtrl,


} = require('../controllers/app.ctrl');

router.get('/home', homeCtrl);
router.get('/recipes', recipesCtrl );
router.delete('/recipes/delete/:id', deleteCtrl);

router.patch('/recipes/update/:id', (req, res) => {
    console.log(req.body)
});

module.exports = router;