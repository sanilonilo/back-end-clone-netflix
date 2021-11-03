const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')

module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors({origin:'*'}))
    app.use(passport.initialize())
}