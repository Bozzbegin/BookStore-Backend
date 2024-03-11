const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'asus';

const login = async (req, res) => {
  const { Username, Password } = req.body;

  req.connectDB.query("SELECT * FROM tb_cus WHERE Username = ?", [req.body.Username], (error, result) => {
    if (error) {
      res.status(500).send({ status: 'Error', message: 'มีข้อผิดพลาดในการดึงข้อมูลผู้ใช้' });
    } else if (result.length === 0) {
      res.status(400).send({ status: 'Error', message: 'ไม่พบผู้ใช้ในระบบ' });
    } else {
      const user = result[0];
      const hash_Password = user.Password;

      bcrypt.compare(Password, hash_Password, (error, isPasswordValid) => {
        if (error) {
          res.status(500).send({ status: 'Error', message: 'มีข้อผิดพลาดในการตรวจสอบรหัสผ่าน' });
        } 
        else if (!isPasswordValid) {
          res.status(400).send({ status: 'Error', message: 'รหัสผ่านไม่ถูกต้อง' });
        } 
        else {
          const role = user.role || 'user';  
          const token = jwt.sign({ username: Username, role: role }, secret, { expiresIn: '1Hr' }); 
          console.log(token);
          res.status(200).send({ status: 'OK', message: 'ล็อกอินสำเร็จ', token});
        }
      });
    }
  });
};
 
module.exports = { login };





// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const crypto = require('crypto');
// const secret = crypto.randomBytes(32).toString('hex');

// const login = async (req, res) => {

//     const connectDB = req.connectDB;
//     connectDB.query("SELECT * FROM tb_cus WHERE Username = ?", [req.body.Username], (error, result) => {

//         if (error) {
//             res.status(500).send({ status: 'Error', message: 'มีผู้ใช้บัญชีนี้เเล้ว' });

//         } else if (result.length === 0) {
//             res.status(400).send({ status: 'Error', message: 'ไม่มีผู้ใช้บัญชีในระบบ' });

//         } else {
//             const hash_Password = result[0].Password;
//             bcrypt.compare(req.body.Password, hash_Password, (error, result_login) => {

//                 if (error) {
//                     res.status(500).send({ status: 'Error', message: 'เกิดข้อผิดพลาดในการตรวจสอบรหัสผ่าน' + error });

//                 } else if (!result_login) {
//                     res.status(400).send({ status: 'Error', message: 'รหัสผ่านไม่ถูกต้อง' });
                    
//                 } else {
//                     const Token = jwt.sign({ Username: result[0].Username }, secret, { expiresIn: '1Hr' });
//                     res.status(200).send({ status: 'OK', message: 'ล็อกอินสำเร็จ', Token });
//                 }
//             });
//         }
//     });
// };

// module.exports = { login };


