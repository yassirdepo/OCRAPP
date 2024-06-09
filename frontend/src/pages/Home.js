import React, { useState } from 'react';
import FactureForm from "../components/FactureForm"
import FactureUpload from "../components/FactureUpload"

const Home = ()=>{

    const [textResult,setTextResult]=useState("");

    return(
        <div className="home">
            <FactureUpload textResult={textResult} setTextResult={setTextResult}/>
            <FactureForm text={textResult}/>
        </div>
    )
}


export default Home