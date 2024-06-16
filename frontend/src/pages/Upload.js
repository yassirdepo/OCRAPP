import React, { useState } from 'react';
import FactureForm from "../components/FactureForm"
import FactureUpload from "../components/FactureUpload"

const Upload = ()=>{

    const [textResult,setTextResult]=useState("");

    return(
        <div className="ajout">
            <FactureUpload textResult={textResult} setTextResult={setTextResult}/>
            <FactureForm text={textResult}/>
        </div>
    )
}


export default Upload