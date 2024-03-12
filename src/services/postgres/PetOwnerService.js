const { nanoid } = require('nanoid')
const { Pool } = require('pg')
const InvariantError = require('../../exceptions/InvariantError')
const NotFoundError = require('../../exceptions/NotFoundError')

class PetOwnerService {
  constructor () {
    this._pool = new Pool()
  }

  async verifyPetOwner ({ ownerId, petId }) {
    const query = {
      text: 'SELECT owner_id, pet_id FROM pet_owner WHERE owner_id = $1 AND pet_id = $2 AND deleted_at IS NULL',
      values: [ownerId, petId]
    }

    const result = await this._pool.query(query)

    if (result.rows.length) throw new InvariantError('Peliharaan sudah ditambahkan')
  }

  async addPetOwner ({ ownerId, petId }) {
    const id = `powner-${nanoid(8)}`
    const createdAt = new Date().toString()

    const query = {
      text: 'INSERT INTO pet_owner VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, ownerId, petId, createdAt]
    }
    try {
      const result = await this._pool.query(query)

      if (!result.rows[0].id) throw InvariantError('Kepemilikan peliharaan gagal ditambahkan')

      return result.rows[0]
    } catch (error) {
      console.log(error)
    }
  }

  async getPetOwnerByOwnerId (ownerId) {
    const queryOwner = {
      text: `SELECT po.owner_id,
              o.name AS owner_name
              FROM pet_owner po
              JOIN owners o ON po.owner_id = o.id
              JOIN pets p ON po.pet_id = p.id
              WHERE po.owner_id = $1
                AND po.deleted_at IS NULL
                AND o.deleted_at IS NULL
                AND p.deleted_at IS NULL`,
      values: [ownerId]
    }

    const queryPet = {
      text: `SELECT po.id,
              po.pet_id,
              p.name AS pet_name
              FROM pet_owner po
              JOIN owners o ON po.owner_id = o.id
              JOIN pets p ON po.pet_id = p.id
              WHERE po.owner_id = $1
                AND po.deleted_at IS NULL
                AND o.deleted_at IS NULL
                AND p.deleted_at IS NULL`,
      values: [ownerId]
    }

    try {
      const resultOwner = await this._pool.query(queryOwner)

      if (!resultOwner.rows.length) throw new NotFoundError('Owner tidak ditemukan')

      const resultPet = await this._pool.query(queryPet)

      return ({
        owner: resultOwner.rows[0],
        pets: resultPet.rows
      })
    } catch (error) {
      console.log(error)
    }
  }

  async deletePetOwnerById (id) {
    const deletedAt = new Date().toISOString()

    const query = {
      text: 'UPDATE pet_owner SET deleted_at = $1 WHERE id = $2 AND deleted_at IS NULL RETURNING id',
      values: [deletedAt, id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new NotFoundError('Gagal menghapus kepemilikan peliharaan. Id tidak ditemukan')
  }
}

module.exports = PetOwnerService
