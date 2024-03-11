const express = require('express');
const router = express.Router();
const multer = require('multer');
const Controller_Register = require('../Controllers/Register');
const Controller_login = require('../Controllers/Login');
const Controller_Auth = require('../Controllers/Auth');
const Controller_Showbook = require('../Controllers/Showbook');
const Controller_Addbook = require('../Controllers/Addbook');
const Controller_Addorder = require('../Controllers/Addorder');
const Controller_Showusers = require('../Controllers/Showusers');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Book_images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const uploadimg = multer({ storage: storage });

router.post('/auth', (req, res) => Controller_Auth.auth(req, res));
router.post('/register', (req, res) => Controller_Register.register(req, res));
router.post('/login', (req, res) => Controller_login.login(req, res));
router.get('/showusers', (req, res) => Controller_Showusers.showusers(req, res));
router.get('/showbook', (req, res) => Controller_Showbook.showbook(req, res));
router.post('/addbook', uploadimg.single('Book_images'), (req, res) => Controller_Addbook.addbook(req, res));
router.post('/addorder', (req, res) => Controller_Addorder.addorder(req, res));

module.exports = router;





