const express = require('express')
const router = express.Router()

const pagesRoutes = require('./pages-routes')
const authRoutes = require('./auth-routes')


router.use('/auth', authRoutes)
router.use('/', pagesRoutes)


module.exports = router