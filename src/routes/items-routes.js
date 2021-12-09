const express = require('express')
const router = express.Router()

const ItemRepository = require('../database/repositories/item-repo')
const ensureAuthenticated = require('../middleware/auth')

const iRepo = new ItemRepository()


router.post('/add', ensureAuthenticated, async (req, res) => {
    let description = req.body.description
    let value = req.body.value
    let type = req.body.type == "option2"
    let userId = parseInt(req.cookies.userId)

    // console.log("Tipo: " + type)


    if (!(description && value && userId)) {
        res.redirect('/add?e=' + encodeURIComponent('All fields must be filled'))
        return
    }

    value = parseInt(value)

    if (!value || value < 0) {
        res.redirect('/add?e=' + encodeURIComponent('Value must be a positive number'))
        return
    }

    if (type) {
        value *= -1
    }

    console.log("Value: " + value)

    const newItem = {
        description: description,
        value: value,
        UserId: userId
    }
    await iRepo.insert(newItem)

    res.redirect('/')
})

router.post('/edit/:id', ensureAuthenticated, async (req, res) => {
    let id = req.params.id
    let description = req.body.description
    let value = req.body.value
    let userId = parseInt(req.cookies.userId)

    let oldItem = await iRepo.findById(id)


    if (!(description && value && userId)) {
        res.redirect(`/edit/${id}?e=` + encodeURIComponent('All fields must be filled'))
        return
    }

    value = parseInt(value)

    if (!value || value < 0) {
        res.redirect(`/edit/${id}?e=` + encodeURIComponent('Value must be a positive number'))
        return
    }

    if (oldItem[0].value < 0) {
        value *= -1
    }

    const newItem = {
        description: description,
        value: value,
        UserId: userId
    }
    await iRepo.update(id, newItem)

    res.redirect('/')
})

router.delete('/delete/:id', ensureAuthenticated, async (req, res) => {
    await iRepo.delete(req.params.id)
    res.redirect('/')
})


module.exports = router