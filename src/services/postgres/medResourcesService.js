const { nanoid } = require('nanoid')
const { Pool } = require('pg')
const InvariantError = require('../../exceptions/InvariantError')
const NotFoundError = require('../../exceptions/NotFoundError')

class MedResourcesService {
  constructor() {
    this._pool = new Pool()
  }

  async addResource({ name, description, type, price }) {
    const id = `resource-${nanoid(8)}`
    const date = new Date().toISOString()

    const parsedPrice = parseFloat(price)

    if (isNaN(parsedPrice) || parsedPrice < 0) {
      throw new InvariantError('Harga tidak valid')
    }

    const query = {
      text: 'INSERT INTO med_resources VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, name, description, type, parsedPrice, date]
    }

    const result = await this._pool.query(query)

    if (!result.rows[0].id) throw new InvariantError('Produk gagal ditambahkan')

    return result.rows[0].id
  }

  async getResources() {
    const result = await this._pool.query(`
      SELECT id, name, description, type, price, created_at
      FROM med_resources
      WHERE deleted_at IS NULL
      ORDER BY name
    `)

    return result.rows
  }

  async getResourceById(id) {
    const query = {
      text: 'SELECT id, name, description, type, price, created_at FROM med_resources WHERE id = $1 AND deleted_at IS NULL',
      values: [id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new NotFoundError('Produk tidak ditemukan')

    return result.rows[0]
  }

  async editResourceById(id, { name, description, type, price }) {
    const updatedAt = new Date().toISOString()
    const query = {
      text: 'UPDATE med_resources SET name = $1, description = $2, type = $3, price = $4, updated_at = $5 WHERE id = $6 AND deleted_at IS NULL RETURNING id',
      values: [name, description, type, price, updatedAt, id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new NotFoundError('Gagal memperbarui Produk. Id tidak ditemukan')
  }

  async deleteResourceById(id) {
    const deletedAt = new Date().toISOString()
    const query = {
      text: 'UPDATE med_resources set deleted_at = $1 WHERE id = $2 AND deleted_at IS NULL RETURNING id',
      values: [deletedAt, id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new NotFoundError('Gagal menghapus Produk. Id tidak ditemukan')
  }
}

module.exports = MedResourcesService
