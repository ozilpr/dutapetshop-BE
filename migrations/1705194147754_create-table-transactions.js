exports.up = pgm => {
  pgm.createTable('transactions', {
    id: {
      type: 'VARCHAR(16)',
      primaryKey: true,
      notNull: true
    },
    resource_id: {
      type: 'VARCHAR(16)',
      notNull: true
    },
    quantity: {
      type: 'INTEGER',
      notNull: true
    },
    price: {
      type: 'INTEGER',
      notNull: true
    },
    created_at: {
      type: 'TEXT',
      notNull: true
    },
    updated_at: {
      type: 'TEXT',
      notNull: false
    },
    deleted_at: {
      type: 'TEXT',
      notNull: false,
      default: null
    }
  }, { ifNotExists: true })

  pgm.addConstraint('transactions', 'fk_transactions.resource_id_med_resources.id', {
    foreignKeys: {
      columns: 'resource_id',
      references: 'med_resources(id)',
      onDelete: 'CASCADE',
      exclude: {
        where: 'deleted_at IS NULL'
      }
    }
  }, { ifNotExists: true })
}

exports.down = pgm => {
  pgm.dropConstraint('fk_transactions.resource_id_med_resources.id', { ifExists: true })
  pgm.dropTable('transactions', { ifExists: true })
}
