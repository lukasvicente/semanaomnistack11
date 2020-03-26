const express  = require('express');


const app = express();

app.get('/',(req,res)=>{
    return res.json({
        user : 'lucas',
        password : '1234'
    });
});

app.listen(3333);