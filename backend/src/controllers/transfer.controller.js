const db= require('../util/db');

exports.createTransfer = async (req,res)=>{
    try{
        const data = req.body;
        db.query('insert into transfers set ?',data,(err,result)=>{
            if(err){
                console.log('Error creating transfer:', err);
                return res.status(500).send('Internal Server Error');
            }
            if(result.affectedRows>0){
                return res.status(200).send('Transfer created successfully');
            }
            res.status(400).send('Transfer not created');
        })

    }
    catch(err){
        console.error('Error creating transfer:', err);
        res.status(500).send('Internal Server Error');
    }
}

exports.getTransfer = async (req, res) => {
    try{
        db.query('select * from transfers',(err,result)=>{
            if(err){
                console.log('Error fetching transfers:', err);
                return res.status(500).send('Internal Server Error');
            }
            if(result.length > 0){
                console.log('Transfers fetched successfully: ', result);
                return res.status(200).json(result);
            }
            res.status(404).send('No transfers found');
        })
    }
    catch(err){
        console.error('Error fetching transfers:', err);
        res.status(500).send('Internal Server Error');
    }
}