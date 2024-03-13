const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const router = require('./Routes/MyAPIs');
const PORT = 5543;
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '10 mb' }));
app.use(cors({
    origin:'*',
    methods:'*'
}));

const connectDB = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tb_bookshop'
});

connectDB.connect((error) => {
    if (error) {
        console.log('Database connect failed: ',error);
        throw error;
    }
    console.log('Database connected!');
});

app.use((req, res, next) => {
    req.connectDB = connectDB;
    next();
});

app.use(router);
app.use('/Book_images', express.static('Book_images'));

app.listen(PORT, () => {
    console.log('Server running on PORT: '+PORT);
});