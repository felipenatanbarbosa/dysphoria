const express = require('express')
const router = express.Router()

const ensureAuthenticated = require('../middleware/auth')


/*
    Por enquanto as páginas usadas no res.render 
    são placeholders para fazer os testes
*/


router.get('/', ensureAuthenticated, (req, res) => {
    console.log("PAGES GET HOME")
    res.render('pages/main')
})

router.get('/login', (req, res) => {
    console.log("PAGES GET LOGIN")
    res.render('pages/login')
})

router.get('/register', (req, res) => {
    console.log("PAGES GET REGISTER")
    res.render('pages/register')
})

router.get('/add', ensureAuthenticated, (req, res) => {
    console.log("PAGES GET ADD")
})

router.get('/edit', ensureAuthenticated, (req, res) => {
    console.log("PAGES GET EDIT")
})

router.get('/report', ensureAuthenticated, (req, res) => {
    console.log("PAGES GET REPORT")
})



module.exports = router