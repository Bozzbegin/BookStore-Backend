const mysql = require('mysql2');

exports.addbook = async (req, res) => {
    try {

        const { Book_Title, Book_Price, Book_img, Book_Description, StockQuantity } = req.body;

        const connectDB = mysql.createConnection ({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'tb_bookshop'
        });

        connectDB.connect();

        const insertQuery = "INSERT INTO tb_book (Book_Title, Book_Price, Book_img, Book_Description, StockQuantity) VALUES (?, ?, ?, ?, ?)";
        const values = [Book_Title, Book_Price, Book_img, Book_Description, StockQuantity];

        connectDB.query(insertQuery, values, (error, results, fields) => {
            if (error) {
                console.log(error);
                res.status(500).send({ status:'Error', message: 'IF error - Addbook', error})
            }
            else {
                res.status(200).send({ status:'OK', message: 'Addbook successfully'})
                console.log(results);
            }

            connectDB.end();
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ status: 'Error', message: 'CATCH error - Addbook'})
    }
};