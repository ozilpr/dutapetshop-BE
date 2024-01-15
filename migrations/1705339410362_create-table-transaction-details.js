exports.up = pgm => {
  pgm.createTable('transaction_details', {
    id: {
      type: 'VARCHAR(16)',
      notNull: true
    },
    transaction_id: {},
    owner_id: {},
    transaction_date: {},
    updated_at: {
      type: 'TEXT',
      notNull: true
    },
    deleted_at: {
      type: 'TEXT',
      notNull: true,
      default: null
    }
  }, { ifNotExists: true })

  pgm.addConstraint('transaction_details', 'fk_transaction_details.transaction_id_transactions.id', {
    foreignKeys: {
      column: 'transaction_id',
      references: 'transactions(id)',
      onDelete: 'CASCADE',
      exclude: {
        where: 'deleted_at IS NULL'
      }
    }
  })

  pgm.addConstraint('transaction_details', 'fk_transaction_details.owner_id_owners.id', {
    foreignKeys: {
      column: 'owner_id',
      references: 'owners(id)',
      onDelete: 'CASCADE',
      exclude: {
        where: 'deleted_at IS NULL'
      }
    }
  })
}

exports.down = pgm => {
  pgm.dropConstraint('transaction_details', 'fk_transaction_details.transaction_id_transactions.id')
  pgm.dropConstraint('transaction_details', 'fk_transaction_details.owner_id_owners.id')
  pgm.dropTable('transaction_details')
}
