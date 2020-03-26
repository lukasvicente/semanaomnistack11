const express  = require('express');


const app = express();

app.get('/',(req,res)=>{
    return res.json({
        user : 'lucas',
        password : '123'
    });
});

app.listen(3333);