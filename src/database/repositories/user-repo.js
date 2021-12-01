const User = require('../../model/user')

class UserRepository {

    insert(obj) {

        return User.create({ ...obj })

    }

    update(id, obj) {

        return User.update({ ...obj }, {
            where: { id: id }
        })

    }

    delete(id) {

        User.destroy({
            where: { id: id }
        })

    }

    findById(id) {

        return User.findAll({
            where: { id: id }
        })

    }

    findByUsername(username) {

        return User.findAll({
            where: { username: username }
        })

    }

    findAll() {
        
        return User.findAll()

    }

}

module.exports = UserRepository
