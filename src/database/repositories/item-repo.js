const Item = require('../../model/item')

class ItemRepository {

    insert(obj) {

        return Item.create({ ...obj })

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
            where: { UserId: user }
        })

    }

    findAll() {
        
        return Item.findAll()

    }

}

module.exports = ItemRepository
