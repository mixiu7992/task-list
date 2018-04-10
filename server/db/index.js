const mysql = require('mysql')
const config = require('../config')

const pool = mysql.createPool({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.pass,
  database: config.mysql.db
})

model.export = {
  insert: function insert(table, obj) {

  }
}
