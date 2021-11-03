const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

    const {existeOuErro,naoExisteOuErro,comparacao} = app.config.msgs

    const generateHash = senha => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(senha,salt)
    }

    const save = async (req,res) => {
       if(!req.body) return res.status(400).send('Dados inválidos')

       const user = {...req.body}

       if(req.user && req.user.id) user.id = req.user.id

       try{
            existeOuErro(user.nome,'Informe seu nome')
            existeOuErro(user.email,'Informe seu email')
            existeOuErro(user.senha,'Informe uma senha')

            if(!user.id){
                const userDb = await app.db('users').where({email:user.email}).first()
                naoExisteOuErro(userDb,'Este email já está cadastrado.')
            }
       }

       catch(msg){
            return res.status(400).send(msg)
       }

       user.senha = generateHash(user.senha)

       if(user.id){
           app.db('users')
              .update(user)
              .where({id:user.id})
              .then(() => res.status(200).send('Usuário atualizado com sucesso'))
              .catch(e => res.status(500).send(e))
       }

       else{
        app.db('users')
        .insert(user)
        .then(() => res.status(200).send('Usuário cadastrado com sucesso'))
        .catch(e => res.status(500).send(e))
       }
    }

    return {save}
}