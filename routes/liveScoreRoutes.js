const express = require('express');
const router = express.Router();
const liveScoreService = require('../service/liveScoreService');

router.get("/liveScore", async (req, res) => {
    try {
        const gamesByDate = await liveScoreService.getGamesLive();
        if (!gamesByDate || gamesByDate.length === 0) {
            return res.status(404).send('Aucun match en cours.');
        }
        res.render('liveScore', { games: gamesByDate }); // Rendre la vue avec les données
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error.message);
        res.status(500).send('Erreur lors de la récupération des données.');
    }
});

module.exports = router;