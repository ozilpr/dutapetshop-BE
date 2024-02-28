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

  async getTransactions () {
    const result = await this._pool.query(`SELECT t.id,
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

  async getTransactionById (id) {
    const result = await this._pool.query(`SELECT t.id,
                                            t.resource_id,
                                            r.name AS resource_name,
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

  async editTransactionById (id, { resourceId, quantity, price }) {
    const updatedAt = new Date().toISOString()
    const query = {
      text: 'UPDATE transactions SET resource_id = $1, quantity = $2, price = $3, updated_at = $4 WHERE id = $5 AND deleted_at IS NULL',
      values: [resourceId, quantity, price, updatedAt, id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new NotFoundError('Gagal memperbarui Transaksi. Id tidak ditemukan')
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
}

module.exports = TransactionsService
