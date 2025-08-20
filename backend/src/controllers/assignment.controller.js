const db= require('../util/db');

exports.createAssignment = async (req, res) => {
    try {
        const data = req.body;
        db.query('INSERT INTO assignments SET ?', data, (err, result) => {
            if (err) {
                console.log('Error creating assignment:', err);
                return res.status(500).send('Internal Server Error');
            }
            if (result.affectedRows > 0) {
                return res.status(200).send('Assignment created successfully');
            }
            res.status(400).send('Assignment not created');
        });
    } catch (err) {
        console.error('Error creating assignment:', err);
        res.status(500).send('Internal Server Error');
    }
}

exports.getAssignments = async (req, res) => {
    try {
        db.query('SELECT * FROM assignments as am join assets as a on a.asset_id=am.asset_id join bases as b on b.base_id = am.base_id join users as u on u.user_id=am.user_id', (err, result) => {
            if (err) {
                console.log('Error fetching assignments:', err);
                return res.status(500).send('Internal Server Error');
            }
            if (result.length > 0) {
                console.log('Assignments fetched successfully:', result);
                return res.status(200).json(result);
            }
            res.status(404).send('No assignments found');
        });
    } catch (err) {
        console.error('Error fetching assignments:', err);
        res.status(500).send('Internal Server Error');
    }
}