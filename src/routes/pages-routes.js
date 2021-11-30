const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    console.log("PAGES GET HOME")
})

router.get('/login', (req, res) => {
    console.log("PAGES GET LOGIN")
})

router.get('/add', (req, res) => {
    console.log("PAGES GET ADD")
})

router.get('/edit', (req, res) => {
    console.log("PAGES GET EDIT")
})

router.get('/report', (req, res) => {
    console.log("PAGES GET REPORT")
})




module.exports = router