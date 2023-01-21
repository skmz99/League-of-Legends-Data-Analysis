import React, {useState, useEffect} from "react";
import {Html5Table as WindowTable} from "window-table";
import {columns,x_labels,graphButtonOptions} from "../content/Columns";
import "../css/home.css"
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title,
    plugins
} from 'chart.js';
import {Bar} from 'react-chartjs-2';
ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title,
    plugins
)

function Home(){
    const [championName,setchampionName] = useState(); //Sets champs icon and name in icon
    const [displayChamp,setdisplayChamp] = useState('LOL_Icon'); //display Champ icon on dropdown
    const [dataSet, setdataSet] = useState(); //Whole dataset for initial page
    const [switchOption, setSwitch] = useState('Summary'); //switch to load button options
    const [isBusy,setBusy] = useState(true); //Loads initial page after dropdown gets set
    const [graphupdateBusy, setgraphupdateBusy] = useState(true);
    const [champData, setchampData] = useState();
    const [champGraph, setchampGraph] = useState(
        {Place: 'TOP',Kills: 100},
        {Place: 'MIDDLe', Kills: 100},
        {Place: 'JUNGLE', Kills: 100},
        {Place: 'BOTTOM', Kills: 100},
        {Place: 'UTILITY', Kills: 100}
        );
    const [graphOption, setgraphOption] = useState("Kills");
    const [scriptData, setscriptData] = useState();
    const graphValue = [100,100,100,100,100];

    const updategraphValue = (option)=>{
        let values = [];
        for (let i = 0; i < Object.keys(champGraph.result).length; i++){
            values.push(champGraph.result[i][option])
        }
        data.datasets[0]['data'] = values;      
    }

    const graphDetail = (option)=>{
        if(option === 'Surrendered' || option === 'Enemy_Inhibitor_Destroyed' || option === ' Objective_Stolen' || option === 'Lane' || option === 'Wins'){
            return 'Sum'
        }else{
            return 'Average'
        }
    }
    
    const data = {
        labels: x_labels,
        datasets: [{
                label: displayChamp + '\'s Average of ' + graphOption + " In Each Lane",
                data: [graphValue[0], graphValue[1], graphValue[2], graphValue[3], graphValue[4]],
                backgroundColor: ['aqua','orange','green','red','navy'],
                borderColor: 'black',
                borderWidth: 1
            }
        ],
    }   

   
    const handleclick = async (champName)=>{
        setdisplayChamp(champName);
        const value = {champName}
        await fetch('http://localhost:5000/champData',{
            method: "POST",
            headers:{
                authorization: 'champData',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(value)
        })
        .then((res)=>{return res.json();})
        .then((value)=>{setchampData(value.result)})

        setgraphupdateBusy(true);
        await fetch('http://localhost:5000/champGraph',{
            method: "POST",
            headers:{
                authorization: 'champGraph',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(value)
        })
        .then((res)=>{return res.json();})
        .then((value)=>{setchampGraph(value)})
        setgraphupdateBusy(false)
        
   }

    useEffect(()=>{
        setBusy(true)
        fetch('http://localhost:5000/championName')
        .then((res)=>{return res.json();})
        .then((value)=>{setchampionName(value.result);})
        setBusy(false)
    },[])

    useEffect(()=>{
        const champValue = {champData,displayChamp}
        // const champName = {displayChamp}
        fetch('http://localhost:5000/script',{
            method: "POST",
            headers:{
                authorization: 'scriptData',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(champValue)
            // data: JSON.stringify(champName)
        })
        .then((res)=>{return res.json();})
        .then((value)=>{setscriptData(value)})
    },[champData,displayChamp])

    useEffect(()=>{
        fetch('http://localhost:5000/allVar')
        .then((res)=>{return res.json();})
        .then((value)=>{setdataSet(value.result)})
    },[])
    
    function renderSwitch(option){
        switch(option){
            case "Summary":
                return(
                    <>
                    <div className={"center_Summary"}>
                        {displayChamp !== "LOL_Icon" && champData !== undefined?(
                            <>
                                <p>Using the observations in Table based on {displayChamp}, a Random Forest Classifier
                                will be used where the column "win" will be the label while the remaining columns will be
                                the features with accuracy and the top five features will be displayed. {scriptData}</p>
                            </>
                        ):(
                            <>
                                <p>{scriptData}</p>
                            </>
                        )}
                    </div>
                    </>
                )
                
                case 'Graph':
                    return(
                        <>
                    <div className={"graphContainer"}>

                    {displayChamp !== "LOL_Icon" && graphupdateBusy === false ?(
                        <>
                        {updategraphValue(graphOption)}
                            <Bar
                                data = {data}
                                options = {{
                                    datalabels:{
                                        display: false
                                    },
                                    plugins:{
                                        legend:{
                                            display: false
                                        },
                                        title: {
                                            display: true,
                                            text: displayChamp + '\'s '+ graphDetail(graphOption) + ' of ' + graphOption + " In Each Lane",
                                            font: {
                                                size: 20
                                            }
                                        }
                                    }
                                }}
                                />
                        </>
                    ):(
                        <>
                        {displayChamp === "LOL_Icon" && graphupdateBusy === true ?(
                            <Bar
                            data = {data}
                            options = {{
                                datalabels:{
                                    display: false
                                },
                                plugins:{
                                    legend:{
                                        display: false
                                    },
                                    title: {
                                        display: true,
                                        text: displayChamp + '\'s '+ graphDetail(graphOption) + ' of ' + graphOption + " In Each Lane",
                                        font: {
                                            size: 20
                                        }
                                    }
                                }
                            }}
                            />
                        
                            ):(
                                <h1>Loading...</h1>
                                )
                            }
                        </>
                    )}
                    </div>
                    </>
                )

            default:
                return(
                    displayChamp === 'LOL_Icon'?(
                        <WindowTable
                        data={dataSet}
                        columns={columns}
                        style={{
                            background:"white",
                            textAlign: "center",
                            overflow: "scroll"
                        }}
                        className="table-sm table-bordered"
                        />
                        ):( <>
                            {champData === undefined || champData[0]['championName'] !== displayChamp?(
                                <div className={'center'}>Loading...</div>
                                ):(
                                    <WindowTable
                                    data={champData}
                                    columns={columns}
                                    style={{
                                        background:"white",
                                        textAlign:"center",
                                        overflow:"scroll"
                                    }}
                                    className="table-sm table-bordered"
                                    />
                                    )
                                }
                            </>
                        )       
                    )
        }
    }

    if(!isBusy){
        return(
            <div className={"Home"}>
                <h1>{displayChamp}</h1>
                <div className={"rounded_container"}>
                    <ul>

                        <div className={"dropDown"}>
                            <img  src={require(`../imgs/${displayChamp}.jpg`)} alt = "Default League of Legends Icon"/>
                            <div className={"dropDown_Content"}>
                                {championName && championName.map((value,key)=>{
                                    return(
                                        <button key={key}  onClick={()=>handleclick(value.championName)}><img id="img" src={require(`../imgs/${value.championName}.jpg`)} alt = "CHAMPION NAME"/>{value.championName}</button>
                                        )
                                    })}
                            </div>                      
                        </div>
                        <button style={{opacity: switchOption==='Summary'?'30%':'100%',overflow:'hidden'}} onClick={()=>setSwitch('Summary')}>Summary</button>
                        <button style={{opacity: switchOption==='Table'?'30%':'100%',overflow:'hidden'}} onClick={()=>setSwitch('Table')}>Table</button>
                        <button disabled={displayChamp === 'LOL_Icon'} hidden={displayChamp === 'LOL_Icon'} style={{opacity: switchOption==='Graph'?'30%':'100%',overflow:'hidden'}} onClick={()=>setSwitch('Graph')}>Graph</button>
                        <div className={"GraphDropdown"}>
                            <button disabled={switchOption!=='Graph'} hidden={switchOption!=='Graph'}>Options</button>
                            <div className={"GraphDropdown_Content"}>
                                {graphButtonOptions.map((value,key)=>{
                                    return(
                                        <button key={key} onClick={()=>setgraphOption(value)}>{value}</button>
                                    )
                                })}
                            </div>
                        </div>
                    </ul>
                    <div className={"table_container"}>
                        {dataSet === undefined ? (
                            <><div className={'center'}>Loading...</div></>
                            ):(
                                renderSwitch(switchOption)
                                )
                            }                       
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;