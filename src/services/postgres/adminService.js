const { nanoid } = require('nanoid')
const { Pool } = require('pg')
const bcryptjs = require('bcryptjs')
const InvariantError = require('../../exceptions/InvariantError')
const NotFoundError = require('../../exceptions/NotFoundError')
const AuthenticationError = require('../../exceptions/AuthenticationsError')

class adminService {
  constructor () {
    this._pool = new Pool()
  }

  async addAdmin ({ username, password, fullname }) {
    const id = `admin-${nanoid(8)}`
    const createdAt = new Date().toISOString()
    const hashedPassword = await bcryptjs.hash(password, 10)
    const query = {
      text: 'INSERT INTO admin VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, username, hashedPassword, fullname, createdAt]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new InvariantError('Admin gagal ditambahkan')

    return result.rows[0].id
  }

  async getAdminById (id) {
    const query = {
      text: 'SELECT id, username, fullname FROM admin WHERE id = $1 AND deleted_at IS NULL',
      values: [id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new NotFoundError('Admin tidak ditemukan')

    return result.rows
  }

  async getAdminByUsername (username) {
    const query = {
      text: 'SELECT id, username, fullname FROM admin WHERE username LIKE $1 AND deleted_at IS NULL',
      values: [username]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new NotFoundError('Admin tidak ditemukan')

    return result.rows
  }

  async verifyNewUsername (username) {
    const query = {
      text: 'SELECT username FROM admin WHERE username LIKE $1 AND deleted_at IS NULL',
      values: [username]
    }

    const result = await this._pool.query(query)

    if (result.rows.length > 0) throw new InvariantError('Gagal menambahkan admin. Username sudah digunakan')
  }

  async verifyCredential (username, password) {
    const query = {
      text: 'SELECT id, username, password FROM admin WHERE username = $1 AND deleted_at IS NULL',
      values: [username]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new AuthenticationError('Kredensial yang Anda berikan salah')

    const { id, password: hashedPassword } = result.rows[0]

    const match = await bcryptjs.compare(password, hashedPassword)

    if (!match) throw new AuthenticationError('Kredensial yang Anda berikan salah')

    return id
  }

  async editAdminByid (id, { username, password, fullname }) {
    const updatedAt = new Date().toISOString()
    const hashedPassword = await bcryptjs.hash(password, 10)

    const query = {
      text: 'UPDATE admin SET username = $1, password = $2, fullname = $3, updated_at = $4 WHERE id = $5',
      values: [username, hashedPassword, fullname, updatedAt, id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new NotFoundError('Gagal memperbarui admin. Id tidak ditemukan')
  }

  async deleteAdminById (id) {
    const deletedAt = new Date().toISOString()
    const query = {
      text: 'UPDATE admin SET deleted_at = $1  WHERE id = $1',
      values: [deletedAt, id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new NotFoundError('Gagal menghapus admin. Id tidak ditemukan')
  }
}

module.exports = adminService
