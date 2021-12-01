const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const passport = require('passport')

const UserRepository = require('../database/repositories/user-repo')

const saltRounds = 12
const uRepo = new UserRepository()



router.post('/login', passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/login"
}))

router.post('/register', async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let passwordConfirmation = req.body.passwordConfirmation

    if (password == passwordConfirmation) {

        console.log("USERNAME: " + username)
        console.log("PASSWORD: " + password)

        if ((await uRepo.findByUsername(username)).length == 0) {

            bcrypt.hash(password, saltRounds, (_, hash) => {
                let user = { 
                    username: username, 
                    password: hash 
                }
    
                uRepo.insert(user)
    
                // res.render('', { user: req.user })
                res.redirect('/login')
            })

        }
        else {

            let error = {
                message: "O nome de usuário já existe"
            }

            let values = {
                username: username,
                password: password,
                passwordConfirmation: passwordConfirmation
            }

            res.render('pages/register', { user: req.user, error: error, values: values })

        }

    }
    else {
        let error = {
            message: "As senhas não coincidem"
        }

        let values = {
            username: username,
            password: password,
            passwordConfirmation: passwordConfirmation
        }

        res.render('pages/register', { user: req.user, error: error, values: values })
    }
})


module.exports = router