require('dotenv').config()

const express = require('express')
const routes = require('./src/routes')
const session = require('express-session')

const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const sequelize = require('./src/database')
const bcrypt = require('bcrypt')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const app = express()
const port = 3000

const UserRepository = require('./src/database/repositories/user-repo')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs')     // Apenas para teste
app.use(express.static(__dirname + '/public'))
app.use(session({
  secret: 's3cr3t',
  resave: false,
  saveUninitialized: true
}))
app.use(cookieParser())
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())


passport.use(new LocalStrategy(
    async (username, password, done) => {
        let uRepo = new UserRepository()
        let user = await uRepo.findByUsername(username)
    
        if (user.length == 0) {
            return done(null, false, { message: 'Usuário não encontrado' })
        }
    
        bcrypt.compare(password, user[0].password, (err, result) => {
    
            if (err) {
                return done(err)
            }
    
            if (!result) {
                return done(null, false, { message: 'Senha inválida' })
            }
    
            return done(null, user[0])
    
        })
    }
))

passport.serializeUser((user, done) => {
    done(null, { id: user.id })
})

passport.deserializeUser(async (obj, done) => {
    let uRepo = new UserRepository()
    let user = await uRepo.findById(obj.id)
    done(null, user[0])
})


app.use('/', routes)

app.listen(port, async () => {
    await sequelize.sync({ force: true })
    console.log(`Servidor está executando na porta ${port}`)
})