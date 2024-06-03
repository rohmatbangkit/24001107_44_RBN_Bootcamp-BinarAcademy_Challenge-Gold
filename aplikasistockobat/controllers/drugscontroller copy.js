const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);

// Get all drugs
exports.getAllDrugs = async (req, res) => {
    try {
        const drugs = await knex('Drugs').select('*');
        res.json(drugs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single drug by ID
exports.getDrugById = async (req, res) => {
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
};

// Create a new drug
exports.createDrug = async (req, res) => {
    try {
        const { Name_of_drug, Preparation, Stock, Pharmacology, Price, Manufacture } = req.body;

        const [newDrug] = await knex('Drugs').insert({
            Name_of_drug,
            Preparation,
            Stock,
            Pharmacology,
            Price,
            Manufacture
        }).returning('*');

        res.status(201).json(newDrug);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update an existing drug
exports.updateDrug = async (req, res) => {
    try {
        const { id } = req.params;
        const { Name_of_drug, Preparation, Stock, Pharmacology, Price, Manufacture } = req.body;

        const updated = await knex('Drugs')
            .where({ Drug_id: id })
            .update({
                Name_of_drug,
                Preparation,
                Stock,
                Pharmacology,
                Price,
                Manufacture
            });

        if (updated) {
            const updatedDrug = await knex('Drugs').where({ Drug_id: id }).first();
            res.json(updatedDrug);
        } else {
            res.status(404).json({ message: 'Drug not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a drug
exports.deleteDrug = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await knex('Drugs').where({ Drug_id: id }).del();

        if (deleted) {
            res.json({ message: 'Drug deleted' });
        } else {
            res.status(404).json({ message: 'Drug not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
