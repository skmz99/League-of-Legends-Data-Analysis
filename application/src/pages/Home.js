import React, { useState, useEffect } from "react";
import '../css/home.css'

function Home(){
    var Summary = "LOL_Icon.jpg";
    const [championName, setchampionName] = useState();
    const [dataSet, setdataSet] = useState();
    const [isBusy,setBusy] = useState(true);
    useEffect(() =>{
        setBusy(true);
        fetch('http://localhost:5000/championName')
        .then((res) => {return res.json();})
        .then((value) => {setchampionName(value.result);})
        setBusy(false);
    },[])

    useEffect(() =>{
        fetch('http://localhost:5000/allVar')
        .then((res) => {return res.json();})
        .then((value) => {setdataSet(value.result)})
    },[])

    if(!isBusy){
        return(
            <div className='Home'>
                <h1>Home Page</h1>
                <div className={"rounded_container"}>
                    <div className={"dropdown"}>
                        <button className={"top_left"}><img src={require(`../imgs/${Summary}`)} alt="Default League of Legends Icon"/></button>
                        <div className={"dropdown_content"}>        
                            {championName && championName.map((value,key) =>{
                                return(
                                    <p key={key}><img id="img" src={require(`../imgs/${value.championName}.jpg`)} alt = "CHAMPION NAME"/>{value.championName}</p>
                                )
                            })}
                        </div>
                    </div>
                    <div className={"center"}>
                        {dataSet === undefined ? (
                            'Loading...'
                            ):(
                                <React.Fragment>
                                This project will focus on a League of Legends csv file and will output graphs/charts and other statistics
                                {console.log(dataSet) }
                                </React.Fragment>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;