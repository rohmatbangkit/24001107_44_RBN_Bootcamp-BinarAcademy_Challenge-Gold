/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('admin', function(table) {
      table.increments('ID').primary(); 
      table.string('name', 50).notNullable(); 
      table.date('date_of_birth').notNullable(); 
      table.string('contact', 20).notNullable(); 
      table.string('email', 255).notNullable().unique(); 
      table.string('password', 20).notNullable();
      });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
     
  };
  
  
  