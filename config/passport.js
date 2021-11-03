const {authSecret} = require('../.env')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const {ExtractJwt,Strategy} = passportJWT

module.exports = app => {
    const params = {
        secretOrKey:authSecret,
        jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params,(payload,done) => {
        return app.db('users')
            .where({id:payload.id})
            .first()       
            .then(user => done(null, user ? payload : false))
            .catch(e => done(e,false))
    })

    passport.use(strategy)
    

    return{
        authenticate: () => passport.authenticate('jwt',{session:false})
    }
}