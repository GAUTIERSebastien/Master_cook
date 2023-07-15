const { resolve } = require('path');

exports.homeCtrl = (req, res) => {

    res.sendFile(resolve('public', 'home.html'));
};



