const express = require('express')
const router = express.Router()

const pagesRoutes = require('./pages-routes')
const authRoutes = require('./auth-routes')
const itemsRoutes = require('./items-routes')


router.use('/item', itemsRoutes)
router.use('/auth', authRoutes)
router.use('/', pagesRoutes)


module.exports = router