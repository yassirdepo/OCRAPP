import React, { useCallback, useEffect,useState } from "react";
import { createWorker } from 'tesseract.js';

const Home = ()=>{
    const [selectedImage,setSelectedImage]=useState(null);
    const [textResult,setTextResult]=useState("");


    const convertImageToText = useCallback(async ()=>{
        if(selectedImage){
            const worker = await createWorker('eng');
            const result = await worker.recognize(selectedImage);
            setTextResult(result.data.text);
            await worker.terminate();
        }
    },[selectedImage])

    useEffect(()=>{
        convertImageToText();
    },[selectedImage, convertImageToText])

    const handleChangeImage = e=>{
        setSelectedImage(e.target.files[0]);
    }
    return(
        <div className="home">
            <h2>Image to Text</h2>
            <div className="input-wrapper">
                <label htmlFor="upload">Upload Image</label>
                <input type="file" id="upload" accept='image/*' onChange={handleChangeImage}/>
            </div>

            <div className="result">
                {selectedImage &&(
                    <div className="box-image">
                        <img src={URL.createObjectURL(selectedImage)} alt="thumb" />
                    </div>
                )}
                {textResult && (
                    <div className="box-p">
                        <p>{textResult}</p>
                    </div>
                )}
            </div>
        </div>
    )
}


export default Home