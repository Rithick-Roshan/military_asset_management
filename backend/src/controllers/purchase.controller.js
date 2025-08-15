const db= require('../util/db');

exports.createPurchase= async (req, res) => {
    try {
        const data = req.body;
        db.query('INSERT INTO purchases SET ?', data, (err, result) => {
            if (err) {
                console.log('Error creating transfer:', err);
                return res.status(500).send('Internal Server Error');
            }
            if (result.affectedRows > 0) {
                return res.status(200).send('Transfer created successfully');
            }
            res.status(400).send('Transfer not created');
        });
    } catch (err) {
        console.error('Error creating transfer:', err);
        res.status(500).send('Internal Server Error');
    }
}

exports.getPurchase = async (req, res) => {
    try {
        db.query('SELECT * FROM purchases', (err, result) => {
            if (err) {
                console.log('Error fetching transfers:', err);
                return res.status(500).send('Internal Server Error');
            }
            if (result.length > 0) {
                console.log('Transfers fetched successfully: ', result);
                return res.status(200).json(result);
            }
            res.status(404).send('No transfers found');
        });
    } catch (err) {
        console.error('Error fetching transfers:', err);
        res.status(500).send('Internal Server Error');
    }
}