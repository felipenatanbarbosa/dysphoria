const express = require('express')
const router = express.Router()

const ItemRepository = require('../database/repositories/item-repo')
const ensureAuthenticated = require('../middleware/auth')

const iRepo = new ItemRepository()


router.post('/add', ensureAuthenticated, async (req, res) => {
    let description = req.body.description
    let value = parseInt(req.body.value)
    let userId = parseInt(req.body.userId)

    // Verify values
    if (!(description && value && userId)) {
        console.error("All fields must be filled")
    }
    else {
        const newItem = {
            description: description,
            value: value,
            user_id: userId
        }
        await iRepo.insert(newItem)
    
        res.redirect('/')
    }
})

router.post('/edit/:id', ensureAuthenticated, async (req, res) => {
    let description = req.body.description
    let value = parseInt(req.body.value)
    let userId = parseInt(req.body.userId)

    // Verify values
    if (Number.isInteger(value)) {
        console.error("Value must be a number")
    }
    if (!(description && value && userId)) {
        console.error("All fields must be filled")
    }

    const newItem = {
        description: description,
        value: value,
        user_id: userId
    }
    await iRepo.update(req.params.id, newItem)

    res.redirect('/')
})

router.delete('/delete/:id', ensureAuthenticated, async (req, res) => {
    await iRepo.delete(req.params.id)
    res.redirect('/')
})


module.exports = router