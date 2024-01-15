exports.up = pgm => {
  pgm.createTable('transactions', {
    id: {
      type: 'VARCHAR(16)',
      primaryKey: true,
      notNull: true
    },
    owner_id: {
      type: 'VARCHAR(16)',
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
    transaction_date: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('current_timestamp')
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
  })

  pgm.addConstraint('transactions', 'fk_transactions.owner_id_owners.id', {})
}

exports.down = pgm => {
  pgm.dropTable('transactions')
}
