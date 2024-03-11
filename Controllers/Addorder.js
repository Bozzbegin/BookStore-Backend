const mysql = require('mysql2');

exports.addorder = async (req, res) => {
    try {
        const { Total_Amount } = req.body;

        const connectDB = mysql.createConnection ({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'tb_bookshop'
        });

        connectDB.connect();

        const cusID = req.body.Cus_ID;
        const userName = req.body.Username;
        const bookID = req.body.Book_ID;

        const insertQuery = "INSERT INTO tb_order (Cus_ID, Book_ID, Username, Orderdate, Total_Amount) VALUES (?, ?, ?, NOW(), ?)";
        const values = [cusID, bookID, userName, Total_Amount];

        connectDB.query(insertQuery, values, (error, results, fields) => {
            if (error) {
                console.log(error);
                res.status(500).send({ status: 'Error', message: 'IF error - AddOrder', error });
            } else {
                res.status(200).send({ status: 'OK', message: 'AddOrder successfully' });
                console.log(results);
            }

            connectDB.end();
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({ status: 'Error', message: 'CATCH error - AddOrder', error: error });
    }
};
