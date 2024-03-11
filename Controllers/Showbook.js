const mysql = require('mysql2');

exports.showbook = async (req, res) => {
    try {
        const connectDB = mysql.createConnection ({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'tb_bookshop'
        });

        connectDB.connect();

        connectDB.query("SELECT * FROM tb_book", (error, results, fields) => {
            if (error) {
                console.log(error);
                res.status(500).send({ status:'Error', message: 'IF error - Showbook'})
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
        res.status(400).send({ status: 'Error', message: 'CATCH error - Showbook'})
    }
};