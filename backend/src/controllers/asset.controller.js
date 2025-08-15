const db = require('../util/db');
exports.createAsset = async (req,res)=>{
    try{
        const data= req.body;
        db.query('insert into assets set ?',data,(err,result)=>{
            if(err){
                console.log('Error creating asset:', err);
                return res.status(500).send('Internal Server Error');
            }
            if(result.affectedRows>0){
                return res.status(200).send('Asset created successfully');
            }
            res.status(400).send('Asset not created');
        })
    }
    catch(err){
        console.error('Error creating asset:', err);
        res.status(500).send('Internal Server Error');
    }
}

exports.getAssets = async (req, res) => {
    try{
         db.query('select * from assets',(err,result)=>{
            if(err){
                console.log('Error fetching assets:', err);
                return res.status(500).send('Internal Server Error');
            }
            if(result.length > 0){
                console.log('Assets fetched successfully'+result);
                return res.status(200).json(result);
            }
            res.status(404).send('No assets found');
         })
    }
    catch(err){
        console.error('Error fetching assets:', err);
        res.status(500).send('Internal Server Error');
    }
}

