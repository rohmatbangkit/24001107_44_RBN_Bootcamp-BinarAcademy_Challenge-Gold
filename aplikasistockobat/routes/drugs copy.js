const express = require('express');
const router = express.Router();
const knexConfig = require('../knexfile'); // Adjust the path if needed
const knex = require('knex')(knexConfig.development); // Use development configuration

// Get all drugs
router.get('/', async (req, res) => {
    try {
        const drugs = await knex('Drugs').select('*');
        res.json(drugs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single drug by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const drug = await knex('Drugs').where({ Drug_id: id }).first();
        if (drug) {
            res.json(drug);
        } else {
            res.status(404).json({ message: 'Drug not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new drug
router.post('/', async (req, res) => {
    try {
        const { Name_of_drug, Preparation, Stock, Pharmacology, Price, Manufacture } = req.body;
        const newDrug = { Name_of_drug, Preparation, Stock, Pharmacology, Price, Manufacture };
        const [id] = await knex('Drugs').insert(newDrug).returning('Drug_id');
        res.status(201).json({ Drug_id: id, ...newDrug });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update an existing drug
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { Name_of_drug, Preparation, Stock, Pharmacology, Price, Manufacture } = req.body;
        const updatedDrug = { Name_of_drug, Preparation, Stock, Pharmacology, Price, Manufacture };
        const count = await knex('Drugs').where({ Drug_id: id }).update(updatedDrug);
        if (count) {
            res.json({ message: 'Drug updated successfully' });
        } else {
            res.status(404).json({ message: 'Drug not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a drug
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const count = await knex('Drugs').where({ Drug_id: id }).del();
        if (count) {
            res.json({ message: 'Drug deleted successfully' });
        } else {
            res.status(404).json({ message: 'Drug not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
