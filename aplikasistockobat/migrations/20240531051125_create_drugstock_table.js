/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Drugs', function(table) {
        table.increments('Drug_id').primary();
        table.string('Name_of_drug').notNullable();
        table.text('Preparation').notNullable();
        table.integer('Stock').notNullable();
        table.text('Pharmacology').notNullable();
        table.specificType('Price', 'NUMERIC').notNullable(); 
        table.string('Manufacture').notNullable();
      });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};





