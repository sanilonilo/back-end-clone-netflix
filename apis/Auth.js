const bcrypt = require('bcrypt-nodejs')
const {authSecret} = require('../.env')
const jwt = require('jwt-simple')

module.exports = app => {

    const {existeOuErro,comparacao} = app.config.msgs

    const login = async (req,res) => {
        if(!req.body) return res.status(400).send('Dados inválidos')

        const user = {...req.body}

        try{
            existeOuErro(user.email,'Informe seu e-mail cadastrado')
            existeOuErro(user.senha,'Informe sua senha de acesso')
        }

        catch(msg){
            return res.status(400).send(msg)
        }

        const userDb = await app.db('users').where({email:user.email}).first()

        if(!userDb) return res.status(400).send('Este usuário não existe')

        const isMatch = bcrypt.compareSync(user.senha,userDb.senha)

        if(!isMatch) return res.status(400).send('Senha incorreta')

        const acesso = Math.floor(Date.now() / 1000)

        const payload = {
            id:userDb.id,
            nome:userDb.nome,
            email:userDb.email,
            iat:acesso,
            exp:acesso+(60*60*24*8)
        }

        res.json({
            ...payload,
            token:jwt.encode(payload,authSecret)
        })
    }

    const verify =  (req,res) => {
        if(req.body && !req.body.token) return false
    

        try{
             const token = jwt.decode(req.body.token,authSecret)
             if(new Date(token.exp * 1000) > new Date()){
                return res.send(true)
            }
        }

        catch(e){
            return res.send(false)
        }

        return res.send(false)

    }

    return {login,verify}
}