const { nanoid } = require('nanoid')
const { Pool } = require('pg')
const InvariantError = require('../../exceptions/InvariantError')
const NotFoundError = require('../../exceptions/NotFoundError')
const GetLocalTime = require('../../utils/getLocalTime')

class TransactionsService {
  constructor() {
    this._pool = new Pool()
  }

  getStartDate(daysAgo) {
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() - daysAgo)
    return currentDate
  }

  async addTransaction({ ownerId, discount, totalPrice, transactionsData }) {
    const transactionId = `transaction-${nanoid(8)}`
    const transactionDate = await new GetLocalTime().getDate()
    const client = await this._pool.connect()

    const transactionItems = []

    try {
      await client.query('BEGIN')

      const queryTransactionDetail = {
        text: 'INSERT INTO transaction_details VALUES($1, $2, $3, $4, $5) RETURNING id',
        values: [transactionId, ownerId, discount, totalPrice, transactionDate]
      }

      const resultTransactionDetail = await client.query(queryTransactionDetail)

      if (!resultTransactionDetail.rows[0].id) throw new InvariantError('Transaksi gagal ditambahkan')

      const transactionList = transactionsData
        .map((transaction) => {
          const itemId = `trans_item-${nanoid(8)}`

          return `(
            '${itemId}', 
            '${transactionId}', 
            '${transaction.resourceId}', 
            '${transaction.quantity}',
            '${transaction.price}',
            '${transactionDate}'
            )`
        })
        .join(', ')

      const queryTransactions = `INSERT INTO transactions VALUES ${transactionList} RETURNING id`

      const result = await client.query(queryTransactions)

      result.rows.forEach((row) => transactionItems.push(row.id))

      if (!result.rows.length) throw new InvariantError(`Transaksi gagal ditambahkan`)

      await client.query('COMMIT')
    } catch (error) {
      await client.query('ROLLBACK')
      console.error('Error adding transactions: ', error.message)
      throw new InvariantError('Transaksi gagal ditambahkan')
    } finally {
      client.release()
    }

    return { transactionId, transactionItems }
  }

  async getTransactions({ startDate = this.getStartDate(30), endDate = new Date() }) {
    const result = await this._pool.query(
      `
      SELECT
        td.id AS transaction_id,
        o.id AS owner_id,
        o.name AS owner_name,
        o.register_code,
        td.discount,
        td.total_price,
        td.transaction_date,
        t.id AS item_id,
        r.name AS resource_name,
        t.quantity,
        t.price
      FROM
        transaction_details td
        INNER JOIN transactions t ON td.id = t.transaction_id
        INNER JOIN med_resources r ON t.resource_id = r.id
        INNER JOIN owners o ON td.owner_id = o.id
      WHERE
        (td.transaction_date >= $1 AND td.transaction_date <= $2)
        AND td.deleted_at IS NULL
        AND t.deleted_at IS NULL
      ORDER BY
        td.transaction_date DESC,
        r.name
      `,
      [startDate, endDate]
    )

    if (!result.rows.length) throw new NotFoundError('Transaksi tidak ditemukan di tanggal tersebut')

    const data = result.rows.reduce((acc, row) => {
      const transaction = acc.find((t) => t.id === row.transaction_id)
      const item = {
        item_id: row.item_id,
        resource_name: row.resource_name,
        quantity: row.quantity,
        price: row.price
      }

      if (transaction) {
        transaction.transaction_items.push(item)
      } else {
        acc.push({
          id: row.transaction_id,
          owner_id: row.owner_id,
          owner_name: row.owner_name,
          register_code: row.register_code,
          discount: row.discount,
          total_price: row.total_price,
          transaction_date: row.transaction_date,
          transaction_items: [item]
        })
      }

      return acc
    }, [])

    return data
  }

  async getTransactionsByOwnerId(ownerId, { startDate = this.getStartDate(30), endDate = new Date() }) {
    const result = await this._pool.query(
      `
        SELECT
          td.id AS transaction_id,
          o.id AS owner_id,
          o.name AS owner_name,
          o.register_code,
          td.discount,
          td.total_price,
          td.transaction_date,
          t.id AS item_id,
          r.name AS resource_name,
          t.quantity,
          t.price
        FROM
          transaction_details td
          INNER JOIN transactions t ON td.id = t.transaction_id
          INNER JOIN med_resources r ON t.resource_id = r.id
          INNER JOIN owners o ON td.owner_id = o.id
        WHERE
          o.id = $1
          AND (td.transaction_date >= $2 AND td.transaction_date <= $3)
          AND td.deleted_at IS NULL
          AND t.deleted_at IS NULL
        ORDER BY
          td.transaction_date DESC,
          r.name
        `,
      [ownerId, startDate, endDate]
    )

    if (!result.rows.length) throw new NotFoundError('Transaksi tidak ditemukan')

    const data = result.rows.reduce((acc, row) => {
      const transaction = acc.find((t) => t.id === row.transaction_id)
      const item = {
        item_id: row.item_id,
        resource_name: row.resource_name,
        quantity: row.quantity,
        price: row.price
      }

      if (transaction) {
        transaction.transaction_items.push(item)
      } else {
        acc.push({
          id: row.transaction_id,
          owner_id: row.owner_id,
          owner_name: row.owner_name,
          register_code: row.register_code,
          discount: row.discount,
          total_price: row.total_price,
          transaction_date: row.transaction_date,
          transaction_items: [item]
        })
      }

      return acc
    }, [])

    return data
  }

  async deleteTransactionById(id) {
    const deletedAt = await new GetLocalTime().getDate()

    const queryTransactions = {
      text: `
        UPDATE
          transactions
        SET
          deleted_at = $1
        WHERE
          transaction_id = $2
          AND deleted_at IS NULL
        RETURNING id
      `,
      values: [deletedAt, id]
    }

    const resultTransaction = await this._pool.query(queryTransactions)

    if (!resultTransaction.rows.length) throw new NotFoundError('Gagal menghapus transaksi. Id tidak ditemukan')

    const queryTransactionDetail = {
      text: `
        UPDATE
          transaction_details
        SET
          deleted_at = $1
        WHERE
          id = $2
          AND deleted_at IS NULL
        RETURNING id
      `,
      values: [deletedAt, id]
    }

    const resultTransDetail = await this._pool.query(queryTransactionDetail)

    if (!resultTransDetail.rows.length) throw new NotFoundError('Gagal menghapus transaksi. Id tidak ditemukan.')
  }
}

module.exports = TransactionsService
