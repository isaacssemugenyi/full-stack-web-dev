const express = require('express');

const router = express.Router();

module.exports = params => {

    const { speakersService } = params;

    router.get('/', async (req, res, next)=>{
        try {
            const speakers = await speakersService.getList();
            const artwork = await speakersService.getAllArtwork();
            return res.render('layout', {
                pageTitle: 'speakers', 
                template: 'speakers', 
                speakers, 
                artwork
            });
        } catch (err) {
            return next(err);
        }
    });

    // speaker detail page
    router.get('/:shortname', async (req, res, next)=>{
        try {
            const speaker = await speakersService.getSpeaker(req.params.shortname);
            const artwork = await speakersService.getArtworkForSpeaker(req.params.shortname);
            return res.render('layout', {
                pageTitle: 'speakers', 
                template: 'speakers-detail', 
                speaker, 
                artwork
            }); 
        } catch (err) {
            return next(err);
        }
    });

    return router;
};