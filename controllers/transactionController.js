const db = require("../connection/conn");
const util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports = {
  payment: async (req, res) => {
    try {
      const { total_price, userId } = req.body;

      // memasukan ke dalam database transaction
      const dbTransactions = await query(
        `insert into transactions (total_price, users_id) value (${total_price}, ${userId})`
      );
      req.body.variant;
      let data = req.body.variant;
      console.log(data);

      await query(
        `INSERT INTO transactions_detail SET ?`,
        data.map((val) => {
          return {
            name: val.name,
            variant: val.variant,
            qty: val.qty,
            price: val.total_price_item,
            toping: val.topping,
            sugar: val.sugar,
            transactions_id: dbTransactions.insertId,
          };
        })
      );

      await query(
        `create event change_status_transaction_${dbTransactions.insertId}
              on schedule at DATE_ADD(NOW(),INTERVAL 1 MINUTE)
              DO
              UPDATE transactions set status = "cancel"
              where id = ${dbTransactions.insertId};`
      );

      const getData = await query(
        `select * from transaction_detail where id = ${dbTransactions.insertId};`
      );

      // memberikan respons
      res.status(201).send({
        isSuccess: true,
        message: " create payment successfully ",
        data: getData,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
