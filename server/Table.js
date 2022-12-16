//This file configs to connect to the database and sets up what kind of command is used
const sqlite3 = require('sqlite3');
const Promise = require('bluebird');

class table{
    constructor() {
        this.db = new sqlite3.Database("./database.db",(err)=>{
            if(err){
                console.log("Error Occurred - " + err.message);
            }else{
                console.log("DataBase Connected");
            }
        })
    }
//if using run for sql query 
    run(sql, params = []) {
        return new Promise((resolve, reject) => {
          this.db.run(sql, params, function (err) {
            if (err) {
              console.log('Error running sql ' + sql)
              console.log(err)
              reject(err)
            } else {
              resolve({ id: this.lastID })
            }
          })
        })
      }
//if using get for sql query
    get(sql, params = []) {
        return new Promise((resolve, reject) => {
          this.db.get(sql, params, (err, result) => {
            if (err) {
              console.log('Error running sql: ' + sql)
              console.log(err)
              reject(err)
            } else {
              resolve(result)
            }
          })
        })
      }
//if using all for sql query
    all(sql, params = []) {
        return new Promise((resolve, reject) => {
          this.db.all(sql, params, (err, rows) => {
            if (err) {
              console.log('Error running sql: ' + sql)
              console.log(err)
              reject(err)
            } else {
              resolve(rows)
            }
          })
        })
      }
}


// export default table;
module.exports = table;