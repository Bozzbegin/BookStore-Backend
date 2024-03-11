const bcrypt = require('bcrypt');

const register = async (req, res) => {
    const data = req.body;
    console.log(data);
    const connectDB = req.connectDB;


    connectDB.query('SELECT * FROM tb_cus WHERE Username = ?', 
    [req.body.Username], (usernameError, usernameResult) => {

        if (usernameError) {
            res.status(500).send({ status: 'Error', message: 'Database error' });

            } else if (usernameResult.length > 0) {
                res.status(400).send({ status: 'Error', message: 'บัญชีผู้ใช้นี้ถูกใช้งานแล้ว' });

            } else {
                bcrypt.hash(req.body.Password, 10, (hashError, hashedPassword) => {

                    if (hashError) {
                        res.status(500).send({ status: 'Error', message: hashError.message });

                    } else {
                        req.body.Password = hashedPassword;
                        connectDB.query("INSERT INTO tb_cus ( Username, Password, Email, Phonenumber, Date) VALUES(?,?,?,?,?)",
                        [req.body.Username, req.body.Password, req.body.Email, req.body.Phonenumber, new Date()], (insertError, result_db) => {
                                
                            if (insertError) {
                                res.status(400).send({ status: 'Error', message: 'ลงทะเบียนผิดพลาด ' + insertError.message });

                            } else {
                                res.status(200).send({ status: 'OK', message: 'ลงทะเบียนสำเร็จ' });
                            }
                        });
                    }
                });
            }
        });
};

module.exports = { register }
