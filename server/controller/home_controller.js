const data_table = require('../leagueCommand')
const {spawn} = require('child_process')
const fs = require('fs');
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
   
const champData = (req,res,next)=>{
    command.champData(req.body.champName)
    .then((result)=>{
        res.json({result})
    })
}

const champGraph = (req,res,next)=>{
    command.champGraph(req.body.champName)
    .then((result)=>{
        res.json({result})
    }) 

}
const randomForest = (req,res,next)=>{
    let data1;
    if(req.body.champData !== undefined){
        fs.writeFile('./scripts/randomForestData.txt',JSON.stringify(req.body.champData), err=>{
            if(err){
                console.error(err);
            }
        })
    }
    
    const python = spawn('python', ['./scripts/randomForest.py',req.body.displayChamp] ,{stdio: 'pipe'});
    
    python.stdout.on('data', function(data){
        data1 = data;           
    })

    python.stderr.on('data', (data)=>{
        console.error(`stderr: ${data}`);
    })

    

    python.on('close',(code)=>{
        data1 = data1.toString();
        res.json(data1);
    })
}
module.exports = {distinctChampionName,view,viewAll,champData, champGraph, randomForest};