/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/register", (req, res) => {
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const email = req.body.email;
    const companyName = req.body.company_name;
    const province = req.body.province;
    const password = req.body.password;
    const businessReferenceNumber = req.body.business_reference_number;

    let query = (`INSERT INTO users(first_name,last_name,email,company_name,province,password,business_reference_number)
    VALUES($1,$2,$3,$4,$5,$6,$7)`, [firstName,lastName,email,companyName,province,password,businessReferenceNumber]);
    console.log(query);
    db.query(query)
      .then(data => {
        const user = data.rows;
        res.json({ user });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
