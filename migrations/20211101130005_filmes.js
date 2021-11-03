
exports.up = function(knex) {
  return knex.schema.createTable('filmes', table => {
      table.increments('id').primary()
      table.string('nome').notNull()
      table.text('descricao')
      table.text('filme').notNull()
      table.text('capa').notNull()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('filmes')
};
