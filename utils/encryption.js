// Import bcrypt
const bcrypt = require("bcrypt");
// Import env
require("dotenv").config();

// Make class of encryption
class Encryption {
  // Function enkripsi
  static encryptPwd(rawPwd) {
    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(rawPwd, salt);
    return hash;
  }

  //   Function dekripsi
  static isPwdValid(rawPwd, hashedPass) {
    return bcrypt.compareSync(rawPwd, hashedPass);
  }
}

module.exports = Encryption;
