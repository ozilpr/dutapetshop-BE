const { nanoid } = require('nanoid')
const { Pool } = require('pg')
const InvariantError = require('../../exceptions/InvariantError')
const NotFoundError = require('../../exceptions/NotFoundError')

class TransactionDetailsService {
  constructor () {
    this._pool = new Pool()
  }

  async addTransactionDetail ({ transactionId, ownerId }) {
    const id = `tdetail-${nanoid(8)}`
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

  async getTransactionDetails () {
    const result = await this._pool.query(`SELECT td.id,
                                            td.transaction_id,
                                            r.name AS resource_name, 
                                            t.quantity,
                                            t.price,
                                            o.id AS owner_id,
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

  async getTransactionDetailById (id) {
    const result = await this._pool.query(`SELECT td.id,
                                            td.transaction_id,
                                            r.name AS resource_name, 
                                            t.quantity,
                                            t.price,
                                            o.id AS owner_id,
                                            o.name AS owner_name,
                                            o.register_code,
                                            o.phone 
                                            FROM transaction_details td
                                            INNER JOIN transactions t ON td.transaction_id = t.id
                                            INNER JOIN med_resources r ON t.resource_id = r.id
                                            INNER JOIN owners o ON td.owner_id = o.id
                                            WHERE td.id = ${id}
                                              AND td.deleted_at IS NULL 
                                              AND t.deleted_at IS NULL
                                              AND r.deleted_at IS NULL
                                              AND o.deleted_at IS NULL`)

    return result.rows
  }

  async getTransactionDetailByOwnerId (id) {
    const result = await this._pool.query(`SELECT td.id,
                                            td.transaction_id,
                                            r.name AS resource_name, 
                                            t.quantity,
                                            t.price,
                                            o.id AS owner_id,
                                            o.name AS owner_name,
                                            o.register_code,
                                            o.phone 
                                            FROM transaction_details td
                                            INNER JOIN transactions t ON td.transaction_id = t.id
                                            INNER JOIN med_resources r ON t.resource_id = r.id
                                            INNER JOIN owners o ON td.owner_id = o.id
                                            WHERE o.id = ${id} 
                                              AND td.deleted_at IS NULL 
                                              AND t.deleted_at IS NULL
                                              AND r.deleted_at IS NULL
                                              AND o.deleted_at IS NULL`)

    return result.rows
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

module.exports = TransactionDetailsService
