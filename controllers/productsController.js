const db = require("../connection/conn");
const util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports = {
  getAllProducts: async (req, res) => {
    try {
      const getAllData = await query(`select * from products`);
      res.status(200).send({
        isSuccess: true,
        message: "get all data product success",
        data: getAllData,
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
