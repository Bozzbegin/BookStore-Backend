const mysql = require('mysql2');

exports.showbook = async (req, res) => {
    try {
        const connectDB = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'tb_bookshop'
        });

        connectDB.connect();

        connectDB.query("SELECT * FROM tb_book", (error, results, fields) => {
            if (error) {
                console.log(error);
                res.status(500).send({ status: 'Error', message: 'IF error - Showbook' })
            } else {
                const imagePaths = results.map(book => {
                    return {
                        ...book,
                        Book_img: `${req.protocol}://${req.get('host')}/Book_images/${book.Book_img}`
                    };
                });
                res.send(imagePaths);
                console.log(imagePaths);
            }

            connectDB.end();
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({ status: 'Error', message: 'CATCH error - Showbook' })
    }
};
