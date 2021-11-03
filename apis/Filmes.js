module.exports = app => { 

    const {existeOuErro} = app.config.msgs
    const limit = 10

    const getFilmes = async (req,res) => {
        const page = req.query && req.query.page || 1
        const filmesCount = await app.db('filmes').count({count:['id']}).first()
        const amount = parseInt(filmesCount.count)
        
        app.db('filmes')
            .limit(limit).offset(limit * page - limit)
            .then(filmes => res.json({data:filmes,amount,limit}))
            .catch(e => res.status(500).send(e))
    }

    return {getFilmes}
}