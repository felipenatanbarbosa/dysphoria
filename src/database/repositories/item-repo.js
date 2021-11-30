const Item = require('../../model/item')

class ItemRepository {

    insert(user_id, obj) {

        return Item.create({ ...obj, user_id })

    }

    update(id, obj) {

        return Item.update({ ...obj }, {
            where: { id: id }
        })

    }

    delete(id) {

        Item.destroy({
            where: { id: id }
        })

    }

    findById(id) {

        return Item.findAll({
            where: { id: id }
        })

    }

    findByUser(user) {

        return Item.findAll({
            where: { user_id: user }
        })

    }

    findAll() {
        
        return Item.findAll()

    }

}

module.exports = ItemRepository
