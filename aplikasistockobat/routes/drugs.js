const express = require('express');
const router = express.Router();
const drugController = require('../controllers/drugscontroller');
const checkDrugData = require('../middleware/checkDrugData'); 

// Routes
router.get('/', drugController.getAllDrugs);
router.get('/:id', drugController.getDrugById);
router.post('/', checkDrugData, drugController.createDrug);
router.put('/:id', checkDrugData, drugController.updateDrug);
router.delete('/:id', drugController.deleteDrug);

module.exports = router;
