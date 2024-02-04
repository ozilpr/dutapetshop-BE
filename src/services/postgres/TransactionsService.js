const { nanoid } = require('nanoid')
const { Pool } = require('pg')
const InvariantError = require('../../exceptions/InvariantError')
const NotFoundError = require('../../exceptions/NotFoundError')

class TransactionsService {
  constructor () {
    this._pool = new Pool()
  }

  async addTransaction ({ transactionData }) {
    const id = `transaction-${nanoid(8)}`
    const createdAt = new Date().toISOString()
    const client = await this._pool.connect()

    const transactionStatus = []

    try {
      await client.query('BEGIN')

      for (const key in transactionData) {
        if (Object.prototype.hasOwnProperty.call(transactionData, key)) {
          const data = transactionData[key]
          const query = {
            text: 'INSERT INTO transactions VALUES($1, $2, $3, $4, $5) RETURNING id',
            values: [id, data.resourceId, data.quantity, data.price, createdAt]
          }

          const result = await client.query(query)

          if (!result.rows[0].id) throw new InvariantError(`Transaksi: ${key},gagal ditambahkan`)

          transactionStatus.push(result.rows[0].id)
        }
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

  async addTransactionDetail ({ transactionId, ownerId }) {
    const id = `transactiondetail-${nanoid(8)}`
    const transactionDate = new Date().toISOString()
    const client = await this._pool.connect()

    try {
      await client.query('BEGIN')
      const query = {
        text: 'INSERT INTO transaction_details VALUES($1, $2, $3, $4) RETURNING id',
        values: [id, transactionId, ownerId, transactionDate]
      }

      const result = await client.query(query)

      if (!result.rows[0].id) throw new InvariantError('Detail transaksi gagal ditambahkan')

      await client.query('COMMIT')
      return result.rows[0].id
    } catch (error) {
      await client.query('ROLLBACK')
      throw new InvariantError('Detail transaksi gagal ditambahkan: ', error.message)
    } finally {
      client.release()
    }
  }

  async getTransactions () {
    const result = await this._pool.query('SELECT id, resource_id, quantity, price, created_at FROM transactions WHERE deleted_at IS NULL')

    return result.rows
  }

  async getTransactionDetails () {
    const result = await this._pool.query(`SELECT td.id,
                                            r.name AS resource_name, 
                                            t.quantity,
                                            t.price, 
                                            o.name AS owner_name,
                                            o.register_code,
                                            o.phone 
                                            FROM transaction_details td
                                            INNER JOIN transactions t ON td.transaction_id = t.id
                                            INNER JOIN med_resources r ON t.resource_id = r.id
                                            INNER JOIN owners o ON td.owner_id = o.id
                                            WHERE td.deleted_at IS NULL 
                                              AND t.deleted_at IS NULL
                                              AND r.deleted_at IS NULL
                                              AND o.deleted_at IS NULL`)

    return result.rows
  }

  async getTransactionById (id) {
    const result = await this._pool.query(`SELECT r.name AS resource_name,
                                            t.id,
                                            t.resource_id,
                                            t.quantity,
                                            t.price,
                                            t.created_at
                                            FROM transactions t
                                            INNER JOIN med_resources r ON t.resource_id = r.id
                                            WHERE t.id = ${id}
                                              AND t.deleted_at IS NULL
                                              AND r.deleted_at IS NULL`)

    if (!result.rows.length) throw new NotFoundError('Transaksi tidak ditemukan')

    return result.rows[0]
  }

  async getTransactionDetailById (id) {
    const query = {
      text: `SELECT td.id,
              r.name AS resource_name, 
              t.quantity,
              t.price, 
              o.register_code,
              o.name AS owner_name,
              o.phone 
              FROM transaction_details td
              INNER JOIN owners o ON td.owner_id = o.id
              INNER JOIN transactions t ON td.transaction_id = t.id
              INNER JOIN med_resources r ON t.resource_id = r.id
              WHERE td.id = $1
                AND t.deleted_at IS NULL
                AND r.deleted_at IS NULL
                AND td.deleted_at IS NULL 
                AND o.deleted_at IS NULL`,
      values: [id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new NotFoundError('Detail transaksi tidak ditemukan')

    return result.rows[0]
  }

  async getTransactionDetailByOwnerId (ownerId) {
    const query = {
      text: `SELECT td.id,
              r.name AS resource_name, 
              t.quantity,
              t.price, 
              o.register_code,
              o.name AS owner_name,
              o.phone 
              FROM transaction_details td
              INNER JOIN owners o ON td.owner_id = o.id
              INNER JOIN transactions t ON td.transaction_id = t.id
              INNER JOIN med_resources r ON t.resource_id = r.id
              WHERE td.owner_id = $1
                AND t.deleted_at IS NULL
                AND r.deleted_at IS NULL
                AND td.deleted_at IS NULL 
                AND o.deleted_at IS NULL`,
      values: [ownerId]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new NotFoundError('Detail transaksi tidak ditemukan')

    return result.rows[0]
  }

  async editTransactionById (id, { resourceId, quantity, price }) {
    const updatedAt = new Date().toISOString()
    const query = {
      text: 'UPDATE transactions SET resource_id = $1, quantity = $2, price = $3, updated_at = $4 WHERE id = $5 AND deleted_at IS NULL',
      values: [resourceId, quantity, price, updatedAt, id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new NotFoundError('Gagal memperbarui Transaksi. Id tidak ditemukan')
  }

  async editTransactionDetailById (id, { transactionId, ownerId }) {
    const updatedAt = new Date().toISOString()
    const query = {
      text: 'UPDATE transaction_details set transaction_id = $1, owner_id = $2, updated_at = $3 WHERE id = $4 AND deleted_at IS NULL',
      values: [transactionId, ownerId, updatedAt, id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new NotFoundError('Gagal memperbarui detail transaksi. Id tidak ditemukan')
  }

  async deleteTransactionById (id) {
    const deletedAt = new Date().toISOString()
    const query = {
      text: 'UPDATE transactions SET deleted_at = $1 WHERE id = $2 AND deleted_at IS NULL',
      values: [deletedAt, id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new NotFoundError('Gagal menghapus transaksi. Id tidak ditemukan')
  }

  async deleteTransactionDetailById (id) {
    const deletedAt = new Date().toISOString()
    const query = {
      text: 'UPDATE transaction_details SET deleted_at = $1 WHERE id = $2 AND deleted_at IS NULL',
      values: [deletedAt, id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new NotFoundError('Gagal menghapus detail transaksi. Id tidak ditemukan')
  }
}

module.exports = TransactionsService
