const express = require('express')
const router = express.Router()

const UserRepository = require('../database/repositories/user-repo')
const uRepo = new UserRepository()


router.get('/', async (_, res) => {
    console.log("API GET ALL")

    const users = await uRepo.findAll()

    // resposta
    let resp = {
        status: 'OK',
        data: users
    }

    res.status(200).json(resp)
})

router.get('/:id', async (req, res) => {
    console.log(`API GET ${req.params.id}`)

    let id = req.params.id
    let user = await uRepo.findById(id);

    if (user.length > 0) {
        let resp = {
            status: 'OK',
            data: user[0]
        }

        res.status(200).json(resp)
    }
    else {
        let resp = {
            status: 'ERROR',
            description: `User with id ${id} not found.`
        }

        res.status(404).json(resp)
    }
})

router.post('/', async (req, res) => {
    console.log(`API POST`)

    let body = req.body

    if (!body.name) {
        let resp = {
            status: 'ERROR',
            description: `User JSON name must be provided.`
        }

        res.status(400).json(resp)
        return
    }

    await uRepo.insert(body)

    // resposta
    let resp = {
        status: 'OK',
        data: `User with id ${body.id} was inserted with success.`
    }

    res.status(200).json(resp)
})

router.put('/:id', async (req, res) => {
    console.log(`API PUT ${req.params.id}`)

    const id = req.params.id
    const body = req.body

    let user = await uRepo.findById(id)

    if (user.length > 0) {
        if (!body.name || !body.email) {
            let resp = {
                status: 'ERROR',
                description: `User JSON with name and email fields must be provided`
            }
        
            res.status(400).json(resp)
        }

        user = await uRepo.update(id, body)

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
    const user = await uRepo.findById(id)

    if (user.length > 0) {
        // deletar
        uRepo.delete(id)

        // resposta
        let resp = {
            status: 'OK',
            data: `User with id ${id} was deleted with success`
        }

        res.status(200).json(resp)
    }
    else {
        let resp = {
            status: 'ERROR',
            description: `User with id ${id} was not found.`
        }

        res.status(404).json(resp)
    }
})


module.exports = router