const mysql=require('mysql2');
    const conection=mysql.createConnection({
        host: 'localhost',
        user:'root',
        password: 'msipc2004',
        database: 'military_asset_management'
    });
    conection.connect((err)=>{
        if(err){
            console.error('error to connect DB:', err);
            return;
        }
        console.log('DB connected successfully');
    });

module.exports = conection;