const { nanoid } = require('nanoid')
const { Pool } = require('pg')
const InvariantError = require('../../exceptions/InvariantError')
const NotFoundError = require('../../exceptions/NotFoundError')

class petsService {
  constructor () {
    this._pool = new Pool()
  }

  async addPet ({ name, type, race, gender, birthdate }) {
    const id = `pet-${nanoid(16)}`
    const createdAt = new Date().toISOString()
    const query = {
      text: 'INSERT INTO pets VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, name, type, race, gender, birthdate, createdAt]
    }

    const result = await this._pool.query(query)

    if (!result.rows[0].id) throw new InvariantError('Peliharaan gagal ditambahkan')

    return result.rows[0].id
  }

  async getPets () {
    const result = await this._pool.query('SELECT id, name, type, race, gender, birthdate, created_at FROM pets WHERE deleted_at IS NULL')

    return result.rows
  }

  async getPetById (id) {
    const query = {
      text: 'SELECT id, name, type, race, gender, birthdate, created_at FROM pets WHERE id = $1 AND deleted_at IS NULL',
      values: [id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new NotFoundError('Peliharaan tidak ditemukan')

    return result.rows
  }

  async editPetById (id, { name, type, race, gender, birthdate }) {
    const updatedAt = new Date().toISOString()
    const query = {
      text: 'UPDATE pets SET name = $1, type = $2, race = $3, gender = $4, birthdate = $5, updated_at = $6 WHERE id = $1 RETURNING id',
      values: [name, type, race, gender, birthdate, updatedAt, id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new NotFoundError('Gagal memperbarui peliharaan. Id tidak ditemukan')

    return result.rows
  }

  async deletePetById (id) {
    const deletedAt = new Date().toISOString()
    const query = {
      text: 'UPDATE pets SET deleted_at = $1 WHERE id = $2 RETURNING id',
      values: [deletedAt, id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new NotFoundError('Gagal menghapus peliharaan. Id tidak ditemukan')
  }
}

module.exports = petsService
