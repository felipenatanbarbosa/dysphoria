const express = require('express')
const router = express.Router()

const usersRoutes = require('./user-routes')
const itemsRoutes = require('./item-routes')
const pagesRoutes = require('./pages-routes')


router.use('/api/users', usersRoutes)
router.use('/api/items', itemsRoutes)
router.use('/', pagesRoutes)


module.exports = router