const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqId');
 
module.exports = {
    async index(req,res){
        
        const  ongs = await connection('ongs').select('*');
    
        res.json(ongs); 
         
    },
    async create(req,res){
        const {nome, email, whatsapp, city, uf} = req.body;

        const id = generateUniqueId();
        
        await connection('ongs').insert({
            id,
            nome,
            email,
            whatsapp,
            city,
            uf,
        });
        return res.json({id});
    }
}; 