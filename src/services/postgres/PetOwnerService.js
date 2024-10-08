const { nanoid } = require('nanoid')
const { Pool } = require('pg')
const InvariantError = require('../../exceptions/InvariantError')
const NotFoundError = require('../../exceptions/NotFoundError')
const GetLocalTime = require('../../utils/getLocalTime')

class PetOwnerService {
  constructor() {
    this._pool = new Pool()
  }

  async verifyPetOwner({ ownerId, petId }) {
    const query = {
      text: 'SELECT owner_id, pet_id FROM pet_owner WHERE owner_id = $1 AND pet_id = $2',
      values: [ownerId, petId]
    }

    const result = await this._pool.query(query)

    if (result.rows.length) throw new InvariantError('Peliharaan sudah ditambahkan')
  }

  async addPetOwner({ ownerId, petId }) {
    const id = `powner-${nanoid(8)}`
    const createdAt = await new GetLocalTime().getDate()

    const query = {
      text: 'INSERT INTO pet_owner VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, ownerId, petId, createdAt]
    }

    const result = await this._pool.query(query)

    if (!result.rows[0].id) throw InvariantError('Kepemilikan peliharaan gagal ditambahkan')

    return result.rows[0]
  }

  async getPetOwnerByOwnerId(ownerId) {
    const query = {
      text: `
        SELECT DISTINCT
          po.owner_id,
          o.name AS owner_name,
          o.register_code,
          po.id AS pet_owner_id,
          po.pet_id,
          p.name AS pet_name
        FROM
          pet_owner po
          INNER JOIN owners o ON po.owner_id = o.id
          INNER JOIN pets p ON po.pet_id = p.id
        WHERE
          po.owner_id = $1
          AND o.deleted_at IS NULL
          AND p.deleted_at IS NULL
      `,
      values: [ownerId]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new NotFoundError('Owner belum memiliki peliharaan')

    const data = {
      owner: {
        owner_id: result.rows[0].owner_id,
        owner_name: result.rows[0].owner_name,
        register_code: result.rows[0].register_code
      },
      pets: result.rows.map((row) => ({
        pet_owner_id: row.pet_owner_id,
        pet_id: row.pet_id,
        pet_name: row.pet_name
      }))
    }

    return data
  }

  async deletePetOwnerById(id) {
    const query = {
      text: 'DELETE FROM pet_owner WHERE id = $1 AND deleted_at IS NULL RETURNING id',
      values: [id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) throw new NotFoundError('Gagal menghapus kepemilikan peliharaan. Id tidak ditemukan')
  }
}

module.exports = PetOwnerService
