const bcryptjs= require('bcryptjs');
const db = require('../util/db');
exports.createUser = async (req,res)=>{
    try{
        const data=req.body;
        db.query('select * from users where email = ?',[data.email], async (err, result)=>{
            if(err){
                console.log('Error checking user:', err);
                return res.status(500).send('Internal Server Error');
            }
            if(result.length>0){
                return result.status(400).alert('User already exits');
            }
            const hash_password= await bcryptjs.hash(data.password,10);
            const status= data.status=='Active'?true:false;
            const userData = {
                username: data.name,
                email: data.email,
                password_hash: hash_password,
                role: data.role,
                status: status,
                base_id: data.baseid
            };
            db.query('insert into users set ?',userData,(err,result)=>{
                if(err){
                    console.log('Error found:',err);
                    return res.status(500).send('Internal Server Error: '+err);
                }
                if(result.affectedRows>0){
                    return res.status(200).send('User created successfully');
                }
                res.status(400).send('User not created');
            })
        })

    }
    catch(err){
        console.error('Error creating user:', err);
        res.status(500).send('Internal Server Error');
    }
}

exports.login= async (req,res)=>{
    try{
        console.log(req.body);
        const {email,password}=req.body;
        db.query('select * from users where email = ?',[email], async (err,result)=>{
            if(err){
                console.log('Error during login:', err);
                return res.status(500).send('Internal Server Error');
            }
            if(result.length==0){
                return res.status(400).send('User not found');
            }
            const user = result[0].password_hash;
            const isMatch = await bcryptjs.compare(password,user);
            if(!isMatch){
                return res.status(400);
            }
            else{
                return res.status(200).send('Login successful');
            }
        })
    }
    catch(err){
        console.error('Error during login:', err);
        res.status(500).send('Internal Server Error');
    }
}

exports.createBase= async (req,res)=>{
    try{
        const data=req.body;
        db.query('insert into bases set ?',data,(err,result)=>{
            if(err){
                console.log('Error creating base:', err);
                return res.status(500).send('Internal Server Error');
            }
            if(result.affectedRows>0){
                return res.status(200).send('Base created successfully');
            }
            res.status(400).send('Base not created');
        })

    }
    catch(err){
        console.error('Error creating base:', err);
        res.status(500).send('Internal Server Error');
    }
}