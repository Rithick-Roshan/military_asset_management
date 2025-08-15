const express = require('express');
const router = express.Router();
const assetController = require('../controllers/asset.controller');

router.post('/create',assetController.createAsset );
router.get('/getall', assetController.getAssets);

module.exports = router;