const data_table = require('../leagueCommand')
const command = new data_table();

const distinctChampionName = (req,res) =>{
    command.championName()
    .then((result) =>{
        res.json({result})
        //console.log is commented out in case of future use
        // console.log(result);
    })
}
const view = (req,res,next) =>{
    res.json({message: "POST IDK"});
};

module.exports = {distinctChampionName,view};