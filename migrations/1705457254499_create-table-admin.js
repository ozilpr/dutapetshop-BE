exports.up = pgm => {
  pgm.createTable('admin', {
    id: {
      type: 'VARCHAR(16)',
      primaryKey: true,
      notNull: true
    },
    username: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    password: {
      type: 'TEXT',
      notNull: true
    },
    fullname: {
      type: 'TEXT',
      notNull: true
    },
    created_at: {
      type: 'TEXT',
      notNull: true
    },
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
}

exports.down = pgm => {
  pgm.dropTable('admin', { ifExists: true })
}
