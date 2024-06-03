/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {  
  await knex('admin').insert([
    {name: 'Rohmat', date_of_birth: '1999-05-01', contact: '083646363476', email: 'rohmat@email.com',password: 'O1bQW1t4Mvo5m4vAAGrV'},
    {name: 'Bangkit', date_of_birth: '1999-05-01', contact: '089277272782', email: 'bangkit@email.com', password: 'Tv0UHPyndz2o2ackVEiD'},
    {name: 'Nugroho', date_of_birth: '1999-05-01', contact: '087287272727', email: 'nugroho@email.com',password: 'Ceko6TiVMlarNYD7YOcE'}
  
  ]);
};