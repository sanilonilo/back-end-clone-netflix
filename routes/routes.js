module.exports = app => {
    app.post('/register', app.apis.Users.save)
    app.post('/login',app.apis.Auth.login)
    app.post('/verify',app.apis.Auth.verify)

    app.route('/user')
        .all(app.config.passport.authenticate())
        .put(app.apis.Users.save)

    app.route('/filmes')
        .all(app.config.passport.authenticate())  
        .get(app.apis.Filmes.getFilmes)  
}