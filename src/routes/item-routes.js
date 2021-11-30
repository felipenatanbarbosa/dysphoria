const express = require('express')
const router = express.Router()

const ItemRepository = require('../database/repositories/item-repo')
const iRepo = new ItemRepository()


router.get('/', async (_, res) => {
    console.log("API GET ALL")

    const items = await iRepo.findAll()

    // resposta
    let resp = {
        status: 'OK',
        data: items
    }

    res.status(200).json(resp)
})

router.get('/:user', async (req, res) => {
    console.log(`API GET ITEMS FROM USER ${req.params.user}`)

    let user = req.params.user
    let items = await iRepo.findByUser(user);

    if (items.length > 0) {
        let resp = {
            status: 'OK',
            data: items
        }

        res.status(200).json(resp)
    }
    else {
        let resp = {
            status: 'ERROR',
            description: `User with id ${user} has no items.`
        }

        res.status(404).json(resp)
    }
})

router.post('/:user', async (req, res) => {
    console.log(`API ITEMS POST`)

    let body = req.body

    if (!body.description || !body.value) {
        let resp = {
            status: 'ERROR',
            description: `Item JSON description and value must be provided.`,
        }

        res.status(400).json(resp)
        return
    }

    await iRepo.insert(req.params.user, body)

    // resposta
    let resp = {
        status: 'OK',
        data: `Item with id ${body.id} was inserted with success.`
    }

    res.status(200).json(resp)
})

router.put('/:id', async (req, res) => {
    console.log(`API PUT ${req.params.id}`)

    const id = req.params.id
    const body = req.body

    let user = await iRepo.findById(id)

    if (user.length > 0) {
        if (!body.description || !body.value) {
            let resp = {
                status: 'ERROR',
                description: `Item JSON description, value and user_id must be provided.`
            }
        
            res.status(400).json(resp)
        }

        user = await iRepo.update(id, body)

        // resposta
        let resp = {
            status: 'OK',
            data: `User with id ${id} was updated with success`
        }

        res.status(200).json(resp)
    }
    else {
        let resp = {
            status: 'ERROR',
            description: `User with id ${id} was not found`
        }

        res.status(404).json(resp)
    }
})

router.delete('/:id', async (req, res) => {
    console.log(`API DELETE ${req.params.id}`)

    const id = req.params.id
    const user = await iRepo.findById(id)

    if (user.length > 0) {
        // deletar
        iRepo.delete(id)

        // resposta
        let resp = {
            status: 'OK',
            data: `Item with id ${id} was deleted with success`
        }

        res.status(200).json(resp)
    }
    else {
        let resp = {
            status: 'ERROR',
            description: `ITem with id ${id} was not found.`
        }

        res.status(404).json(resp)
    }
})


module.exports = router