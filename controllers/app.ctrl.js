const express = require('express');


const { resolve } = require('path');
const { recipes } = require("../data/db.json");



exports.homeCtrl = (req, res) => {
    res.sendFile(resolve('public', 'home.html'));
};
exports.servicesCtrl = (req, res) => {
    // Connexion à la BDD
    // Récupération des livres
    // Vérification de la cnx
    res.end('Services');
};
exports.contactCtrl = (req, res) => res.end('Contact');

exports.recipesCtrl = (req, res) => res.json(recipes)


