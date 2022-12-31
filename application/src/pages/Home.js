import React, {useState, useEffect} from "react";
import {Html5Table as WindowTable} from "window-table";
import {columns} from "../content/Columns";
import "../css/home.css"

function Home(){
    const [championName,setchampionName] = useState();
    const [displayChamp,setdisplayChamp] = useState('LOL_Icon');
    const [dataSet, setdataSet] = useState();
    const [isBusy,setBusy] = useState(true);

    useEffect(()=>{
        setBusy(true)
        fetch('http://localhost:5000/championName')
        .then((res)=>{return res.json();})
        .then((value)=>{setchampionName(value.result);})
        setBusy(false)
    },[])

    useEffect(()=>{
        fetch('http://localhost:5000/allVar')
        .then((res)=>{return res.json();})
        .then((value)=>{setdataSet(value.result)})
    },[])

    if(!isBusy){
        return(
            <div className='Home'>
                <h1>Home Page</h1>
                <div className={"rounded_container"}>
                    <div className={"dropdown"}>
                        <img className={"top_left"} src={require(`../imgs/${displayChamp}.jpg`)} alt = "Default League of Legends Icon"/>
                        <div className={"dropdown_content"}>
                            {championName && championName.map((value,key)=>{
                                return(
                                    <button key={key} onClick={()=>setdisplayChamp(value.championName)}><img id="img" src={require(`../imgs/${value.championName}.jpg`)} alt = "CHAMPION NAME"/>{value.championName}</button>
                                )
                            })}
                        </div>
                    </div>
                    <div className={"table_container"}>
                            {dataSet === undefined ? (
                                <>
                                <div className={"center"}>Loading...</div>
                                </>
                                ):(
                                    <>
                                        <WindowTable
                                            data={dataSet}
                                            columns={columns}
                                            style={{background: "#FFF"}}
                                            className="table-sm table-bordered"
                                        />
                                    </>
                            )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;