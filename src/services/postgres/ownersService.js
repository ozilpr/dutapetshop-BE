const { nanoid } = require('nanoid')
const { Pool } = require('pg')
const InvariantError = require('../../exceptions/InvariantError')
const NotFoundError = require('../../exceptions/NotFoundError')

class ownersService {
  constructior () {
    this._pool = new Pool()
  }

  async addOwner (registerCode, name, phone) {
    const id = `owner-${nanoid(16)}`
    const createdAt = new Date().toISOString()
    const query = {
      text: 'INSERT INTO owners VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, registerCode, name, phone, createdAt]
    }

    const result = this._pool.query(query)

    if (!result.rows.length) throw new InvariantError('Owner gagal ditambahkan')

    return result.rows
  }

  async getOwners () {
    const result = this._pool.query('SELECT id, register_code, name, phone, created_at FROM med_resources WHERE deleted_at IS NULL')

    return result.rows
  }

  async editOwnerById (id, { registerCode, name, phone }) {
    const updatedAt = new Date().toISOString()
    const query = {
      text: 'UPDATE owners SET register_code = $1, name = $2, phone = $3, updated_at = $4 WHERE id = $5 RETURNING id',
      values: [registerCode, name, phone, updatedAt, id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new NotFoundError('Gagal memperbarui owner. Id tidak ditemukan')

    return result.rows
  }

  async deleteOwnerById (id) {
    const deletedAt = new Date().toISOString()
    const query = {
      text: 'UPDATE owners SET deleted_at = $1 WHERE id = $2 returning id',
      values: [deletedAt, id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new NotFoundError('Gagal menghapus owner. Id tidak ditemukan')

    return result.rows
  }
}

module.exports = ownersService
