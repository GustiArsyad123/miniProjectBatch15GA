const { user } = require("../models");
const { generateToken, encodePin, compare } = require("../utils");

class Users {
  static async createUser(req, res, next) {
    try {
      const { firstName, lastName, email, password, image } = req.body;
      const hashPassword = encodePin(password);

      const newUser = await user.create({
        firstName,
        lastName,
        email,
        password: hashPassword,
        image,
      });

      const data = await user.findOne({
        attributes: ["firstName", "lastName", "email", "image"],
        where: {
          id: newUser.id,
        },
      });
      return res.status(201).json({
        status: 201,
        data,
      });
    } catch (error) {
      //next(error);
      console.log(error);
    }
  }

  static async getUserDetail(req, res, next) {
    try {
      const id = req.params.id;
      const userData = await user.findOne({
        attributes: ["firstName", "lastName", "email", "image"],
        where: {
          id,
        },
      });

      res.status(200).json({
        status: 200,
        data: userData,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async login(req, res, next) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const dataUser = await user.findOne({
        where: {
          email,
        },
      });

      const hashPass = dataUser.dataValues.password;
      const compareResult = compare(password, hashPass);
      //compare password
      if (!compareResult) {
        res.status(401).json({
          status: 401,
          msg: "Masukkan Email dan Password yang benar",
        });
        return;
      }

      if (!dataUser) {
        res.status(401).json({
          status: 401,
          msg: "Silahkan daftarkan akun anda",
        });
      }
      const payload = dataUser.dataValues;
      const token = generateToken(payload);
      console.log(token);
      res.status(200).json({
        status: 200,
        token,
      });
    } catch (error) {
      console.log(error);
    }
  }

  //update user
  static async updateUser(req, res, next) {
    try {
      console.log(req.loginUser, "ini update");
      const { firstName, lastName, email, password, image } = req.body;
      const hashPassword = encodePin(password);
      await user.update(
        {
          firstName,
          lastName,
          email,
          password: hashPassword,
          image,
        },
        { where: { id: req.loginUser.id } }
      );

      const data = await user.findOne({
        attributes: ["firstName", "lastName", "email", "image"],
        where: {
          id: req.loginUser.id,
        },
      });
      return res.status(201).json({
        status: 201,
        data,
      });
    } catch (error) {
      //next(error);
      console.log(error);
    }
  }

  //delete User
  static async deleteUser(req, res, next) {
    try {
      const id = req.params.id;
      const deletedUser = await user.destroy({
        where: {
          id,
        },
        returning: true,
      });

      if (!deletedUser) {
        res.status(404).json({
          status: 404,
          msg: "The User Not Found",
        });
        return;
      }

      res.status(200).json({
        status: 200,
        data: {
          msg: "Berhasil menghapus User " + id,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

//export module
module.exports = Users;
