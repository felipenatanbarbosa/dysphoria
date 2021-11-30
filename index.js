require('dotenv').config()

const express = require('express')
const routes = require('./src/routes')

const sequelize = require('./src/database')

const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', routes)

app.listen(port, async () => {
    await sequelize.sync({ force: true })
    console.log(`Servidor está executando na porta ${port}`)
})