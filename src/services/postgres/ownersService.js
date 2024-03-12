const { nanoid } = require('nanoid')
const { Pool } = require('pg')
const InvariantError = require('../../exceptions/InvariantError')
const NotFoundError = require('../../exceptions/NotFoundError')

class OwnersService {
  constructor () {
    this._pool = new Pool()
  }

  async addOwner ({ registerCode, name, phone }) {
    const id = `owner-${nanoid(8)}`
    const createdAt = new Date().toISOString()

    const query = {
      text: 'INSERT INTO owners VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, registerCode, name, phone, createdAt]
    }

    const result = await this._pool.query(query)

    if (!result.rows[0].id) throw new InvariantError('Owner gagal ditambahkan')

    return result.rows[0].id
  }

  async getOwners () {
    const result = await this._pool.query('SELECT id, register_code, name, phone, created_at FROM owners WHERE deleted_at IS NULL')

    return result.rows
  }

  async getOwnerById ({ id }) {
    const query = {
      text: 'SELECT id, register_code, name, phone, created_at FROM owners WHERE id = $1 AND deleted_at IS NULL',
      values: [id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new NotFoundError('Owner tidak ditemukan')

    return result.rows[0]
  }

  async editOwnerById (id, { registerCode, name, phone }) {
    const updatedAt = new Date().toISOString()
    const query = {
      text: 'UPDATE owners SET register_code = $1, name = $2, phone = $3, updated_at = $4 WHERE id = $5 AND deleted_at IS NULL RETURNING id',
      values: [registerCode, name, phone, updatedAt, id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new NotFoundError('Gagal memperbarui owner. Id tidak ditemukan')
  }

  async deleteOwnerById (id) {
    const deletedAt = new Date().toISOString()
    const query = {
      text: 'UPDATE owners SET deleted_at = $1 WHERE id = $2 AND deleted_at IS NULL',
      values: [deletedAt, id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new NotFoundError('Gagal menghapus owner. Id tidak ditemukan')
  }
}

module.exports = OwnersService
