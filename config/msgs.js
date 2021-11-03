module.exports = app => {
    const existeOuErro = (val,msg) => {
        if(!val)  throw msg

        else if(typeof val == String && !val.trim()) throw msg

        else if(Array.isArray(val) && val.length === 0) throw msg
    }

    const naoExisteOuErro = (val,msg) => {
        try{
            existeOuErro(val,msg)
        }

        catch(e){
            return 
        }

        throw msg
    }

    const comparacao = (valA,valB,msg) => {
        if(valA !== valB) throw msg
    }

    return {existeOuErro,naoExisteOuErro,comparacao}
}