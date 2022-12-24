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

const viewAll = (req,res,next) =>{
    command.viewAll()
    .then((result)=>{
        res.json({result})
    })
}

module.exports = {distinctChampionName,view,viewAll};