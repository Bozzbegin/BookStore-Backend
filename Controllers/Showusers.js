const mysql = require('mysql2');

exports.showusers = async (req, res) => {
    try {
        const connectDB = mysql.createConnection ({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'tb_bookshop'
        });

        connectDB.connect();

        connectDB.query("SELECT * FROM tb_cus", (error, results, fields) => {
            if (error) {
                console.log(error);
                res.status(500).send({ status:'Error', message: 'IF error - Showusers'})
            }
            else {
                res.send(results);
                console.log(results);
            }

            connectDB.end();
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ status: 'Error', message: 'CATCH error - Showusers'})
    }
};