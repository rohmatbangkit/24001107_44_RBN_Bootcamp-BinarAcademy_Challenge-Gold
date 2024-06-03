/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex('Drugs').insert([
    {Name_of_drug: 'Promag', Preparation: 'Tablet', Stock: 26, Pharmacology: 'Antasida', Price: 9700, Manufacture: 'PT. Kalbe Farma'},
    {Name_of_drug: 'Mylanta', Preparation: 'Sirup', Stock: 36, Pharmacology: 'Antasida', Price: 9700, Manufacture: 'PT. INTEGRATED HEALTHCARE INDONESIA'}
  ]);
};
