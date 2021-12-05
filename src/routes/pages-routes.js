const express = require('express')
const router = express.Router()

const ensureAuthenticated = require('../middleware/auth')
const ItemRepository = require('../database/repositories/item-repo')

const iRepo = new ItemRepository()


/*
    Por enquanto as páginas usadas no res.render 
    são placeholders para fazer os testes
*/


router.get('/', ensureAuthenticated, async (req, res) => {
    console.log("PAGES GET HOME")
    const userItems = await iRepo.findAll(req.cookies.userId)
    let items = []
    userItems.forEach((item) => {
        items.push({
            id: item.id,
            description: item.description,
            value: item.value
        })
    })
    console.log(items)
    res.render('pages/main', { items: items })
})

router.get('/login', (_, res) => {
    console.log("PAGES GET LOGIN")
    res.render('pages/login')
})

router.get('/register', (_, res) => {
    console.log("PAGES GET REGISTER")
    res.render('pages/register')
})

router.get('/logintest', (_,res) => {
    res.render('/Users/lipe/Documents/Projetos/dysphoria/views/res/login.html')
})

router.get('/add', ensureAuthenticated, (req, res) => {
    console.log("PAGES GET ADD")
    res.render('pages/add', { userId: req.cookies.userId })
})

router.get('/edit/:id', ensureAuthenticated, async (req, res) => {
    console.log("PAGES GET EDIT")
    const item = await iRepo.findById(req.params.id)
    res.render('pages/edit', { item: item })
})

router.get('/report', ensureAuthenticated, (req, res) => {
    console.log("PAGES GET REPORT")
})



module.exports = router