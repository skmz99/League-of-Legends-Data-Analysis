const Table = require('./Table')

class leagueCommand extends Table{
    constructor() {
        super();
    }

championName(){
    return this.all(
        `SELECT DISTINCT championName FROM dataset ORDER BY championName ASC`);
    }

viewAll(){
    return this.all(`SELECT * FROM dataset`);
    }
}


// export default leagueCommand;
module.exports = leagueCommand;