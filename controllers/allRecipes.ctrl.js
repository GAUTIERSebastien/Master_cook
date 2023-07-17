const data = require('../data/db.json');

exports.getAllRecipes = (req, res) => {
    try {
        res.status(200).json(data.allRecipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    
};
