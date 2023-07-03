const db = require("../connection/conn");
const util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports = {
  signUp: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const validate = await query(
        `select exists (select * from users where username = "${username}" or email ="${email}" ) AS found_account;`
      );

      const isFound = validate[0].found_account;

      if (isFound === 1)
        throw { message: "your username or email is already taken " };
      const createAccount = await query(
        `insert into users (username, email, password) value ('${username}', '${email}', '${password}')`
      );

      const getDataUser = await query(
        `select * from users where id = ${createAccount.insertId}`
      );

      res.status(201).send({
        isSuccess: true,
        message: " register success ",
        data: getDataUser,
      });
    } catch (error) {
      res.status(400).send({
        isSuccess: true,
        message: error.message,
        data: null,
      });
    }
  },
  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      const getData = await query(
        `select exists (select * from users where email = "${email}" and password = "${password}" ) as found_account`
      );

      let isFound = getData[0].found_account;
      if (isFound === 0) throw { message: " Account not found" };
      res.status(200).send({
        isSuccess: true,
        message: "login success",
        data: null,
      });
    } catch (error) {
      res.status(404).send({
        isSuccess: false,
        message: error.message,
        data: null,
      });
    }
  },
};
