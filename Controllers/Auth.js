const jwt = require('jsonwebtoken');
const secret = 'asus';

const auth = async (req, res) => {
        
    try {
        const Token = req.headers.authorization.split(' ')[1];
        const Showuser = jwt.verify(Token, secret);
        
        console.log(Token);
        res.status(200).json({ status: 'OK', Showuser });
    }
    catch (error) {
        res.status(400).send({ status: 'Error', message: 'ไม่พบ Token' ,error});
    }
};

module.exports = { auth }