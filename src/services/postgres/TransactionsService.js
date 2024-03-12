const { nanoid } = require('nanoid')
const { Pool } = require('pg')
const InvariantError = require('../../exceptions/InvariantError')
const NotFoundError = require('../../exceptions/NotFoundError')

class TransactionsService {
  constructor () {
    this._pool = new Pool()
  }

  async addTransactionDetail (ownerId) {
    const id = `transaction-${nanoid(8)}`
    const transactionDate = new Date().toISOString()
    const client = await this._pool.connect()

    try {
      await client.query('BEGIN')

      const query = {
        text: 'INSERT INTO transaction_details VALUES($1, $2, $3) RETURNING id',
        values: [id, ownerId, transactionDate]
      }

      const result = await client.query(query)

      if (!result.rows[0].id) throw new InvariantError('Detail transaksi gagal ditambahkan')

      await client.query('COMMIT')
      return result.rows[0].id
    } catch (error) {
      await client.query('ROLLBACK')
      console.log(error)
      throw new InvariantError('Detail transaksi gagal ditambahkan: ', error.message)
    } finally {
      client.release()
    }
  }

  async getResourcePriceByResourceId (resourceId) {
    const query = {
      text: 'SELECT price FROM med_resources WHERE id = $1 AND deleted_at IS NULL',
      values: [resourceId]
    }

    const result = await this._pool.query(query)

    if (!result.rows[0].price) throw new NotFoundError('Resource id tidak ditemukan')

    return result.rows[0].price
  }

  async getTransactionDetails () {
    const result = await this._pool.query(`SELECT td.id,
                                            t.transaction_id,
                                            r.name AS resource_name, 
                                            t.quantity,
                                            t.price,
                                            o.id AS owner_id,
                                            o.name AS owner_name,
                                            o.register_code
                                            FROM transaction_details td
                                            INNER JOIN transactions t ON td.id = t.transaction_id
                                            INNER JOIN med_resources r ON t.resource_id = r.id
                                            INNER JOIN owners o ON td.owner_id = o.id
                                            WHERE td.deleted_at IS NULL 
                                              AND t.deleted_at IS NULL
                                              AND r.deleted_at IS NULL
                                              AND o.deleted_at IS NULL`)

    return result.rows
  }

  async getTransactionDetailById (id) {
    const query = {
      text: `SELECT td.id,
              t.transaction_id,
              r.name AS resource_name,
              t.quantity,
              t.price,
              o.id AS owner_id,
              o.name AS owner_name,
              o.register_code,
              o.phone
              FROM transaction_details td
              INNER JOIN transactions t ON td.id = t.transaction_id
              INNER JOIN med_resources r ON t.resource_id = r.id
              INNER JOIN owners o ON td.owner_id = o.id
              WHERE td.id = $1
                AND td.deleted_at IS NULL 
                AND t.deleted_at IS NULL
                AND r.deleted_at IS NULL
                AND o.deleted_at IS NULL`,
      values: [id]
    }
    try {
      const result = await this._pool.query(query)

      return result.rows
    } catch (error) {
      console.error(error)
    }
  }

  async getTransactionDetailByOwnerId (ownerId) {
    const query = {
      text: `SELECT td.id,
              t.transaction_id,
              r.name AS resource_name,
              t.quantity,
              t.price,
              o.id AS owner_id,
              o.name AS owner_name,
              o.register_code,
              o.phone
              FROM transaction_details td
              INNER JOIN transactions t ON td.id = t.transaction_id
              INNER JOIN med_resources r ON t.resource_id = r.id
              INNER JOIN owners o ON td.owner_id = o.id
              WHERE o.id = $1
                AND td.deleted_at IS NULL
                AND t.deleted_at IS NULL
                AND r.deleted_at IS NULL
                AND o.deleted_at IS NULL`,
      values: [ownerId]
    }
    const result = await this._pool.query(query)

    return result.rows
  }

  async editTransactionDetailById (id, { ownerId }) {
    const updatedAt = new Date().toISOString()
    const query = {
      text: 'UPDATE transaction_details set owner_id = $1, updated_at = $2 WHERE id = $3 AND deleted_at IS NULL RETURNING id',
      values: [ownerId, updatedAt, id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new NotFoundError('Gagal memperbarui detail transaksi. Id tidak ditemukan')
  }

  async deleteTransactionDetailById (id) {
    const deletedAt = new Date().toISOString()
    const queryTransactionsId = {
      text: 'SELECT id FROM transactions WHERE transaction_id = $1 AND deleted_at IS NULL',
      values: [id]
    }
    const transactionsId = await this._pool.query(queryTransactionsId)

    for (const transaction of transactionsId.rows) {
      const queryTransactions = {
        text: 'UPDATE transactions SET deleted_at = $1 WHERE id = $2 AND deleted_at IS NULL RETURNING id',
        values: [deletedAt, transaction.id]
      }

      const result = await this._pool.query(queryTransactions)

      if (!result.rows.length) throw new NotFoundError('Gagal menghapus transaksi. Id tidak ditemukan')
    }

    const queryTransactionDetail = {
      text: 'UPDATE transaction_details SET deleted_at = $1 WHERE id = $2 AND deleted_at IS NULL RETURNING id',
      values: [deletedAt, id]
    }
    const result = await this._pool.query(queryTransactionDetail)

    if (!result.rows.length) throw new NotFoundError('Gagal menghapus detail transaksi. Id tidak ditemukan.')
  }

  async addTransaction (transactionId, transactionsData) {
    const createdAt = new Date().toISOString()
    const client = await this._pool.connect()

    let iterationCount = 0

    const transactionStatus = []

    try {
      await client.query('BEGIN')

      for (const transaction of transactionsData) {
        const price = await this.getResourcePriceByResourceId(transaction.resourceId)

        const id = `id-${nanoid(8)}`
        const query = {
          text: 'INSERT INTO transactions VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
          values: [id, transactionId, transaction.resourceId, transaction.quantity, price, createdAt]
        }

        const result = await client.query(query)
        iterationCount++

        if (!result.rows[0].id) throw new InvariantError(`Transaksi ke: ${iterationCount},gagal ditambahkan`)

        transactionStatus.push(result.rows[0].id)
      }
      await client.query('COMMIT')
    } catch (error) {
      await client.query('ROLLBACK')
      console.error('Error adding transactions: ', error.message)
      throw new InvariantError('Transaksi gagal ditambahkan')
    } finally {
      client.release()
    }
    return transactionStatus
  }

  async getTransactions () {
    const result = await this._pool.query(`SELECT t.id,
                                            t.transaction_id,
                                            t.resource_id,
                                            r.name AS resource_name,
                                            t.quantity,
                                            t.price,
                                            t.created_at
                                            FROM transactions t
                                            INNER JOIN med_resources r ON t.resource_id = r.id
                                            WHERE t.deleted_at IS NULL
                                              AND r.deleted_at IS NULL`)

    return result.rows
  }

  async getTransactionByTransactionId (transactionId, id) {
    const query = {
      text: `SELECT t.id,
              t.transaction_id,
              t.resource_id,
              r.name AS resource_name,
              t.quantity,
              t.price,
              t.created_at
              FROM transactions t
              INNER JOIN med_resources r ON t.resource_id = r.id
              WHERE t.id = $1
                AND t.transaction_id = $2
                AND t.deleted_at IS NULL
                AND r.deleted_at IS NULL`,
      values: [id, transactionId]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new NotFoundError('Transaksi tidak ditemukan')

    return result.rows
  }

  async editTransactionById (id, { resourceId, quantity }) {
    const price = await this.getResourcePriceByResourceId(resourceId)

    const updatedAt = new Date().toISOString()

    const query = {
      text: 'UPDATE transactions SET resource_id = $1, quantity = $2, price = $3, updated_at = $4 WHERE id = $5 AND deleted_at IS NULL RETURNING id',
      values: [resourceId, quantity, price, updatedAt, id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new NotFoundError('Gagal memperbarui Transaksi. Id transaksi tidak ditemukan')
  }

  async deleteTransactionById (id) {
    const deletedAt = new Date().toISOString()
    const query = {
      text: 'UPDATE transactions SET deleted_at = $1 WHERE id = $2 AND deleted_at IS NULL RETURNING id',
      values: [deletedAt, id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new NotFoundError('Gagal menghapus transaksi. Id tidak ditemukan')
  }

  async deleteTransactionByTransactionId (transactionId) {
    const deletedAt = new Date().toISOString()
    const query = {
      text: 'UPDATE transactions SET deleted_at = $1 WHERE transactionId = $2 AND deleted_at IS NULL RETURNING id',
      values: [deletedAt, transactionId]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new NotFoundError('Gagal menghapus transaksi. Id tidak ditemukan')
  }
}

module.exports = TransactionsService
