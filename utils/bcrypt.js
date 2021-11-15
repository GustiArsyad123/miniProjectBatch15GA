const bcrypt = require("bcryptjs");

const encodePin = (plain) => {
  try {
    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(plain, salt);
    return hash;
  } catch (error) {
    console.log(error);
  }
};

const compare = (plain, hash) => {
  return bcrypt.compareSync(plain, hash);
};

module.exports = {
  encodePin,
  compare,
};
