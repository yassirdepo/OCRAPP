import React, { useCallback, useEffect,useState } from "react";
import { createWorker } from 'tesseract.js'

import axios from 'axios'

const FactureUpload = ({ setTextResult })=>{

    const [selectedImage,setSelectedImage]=useState(null);


    const convertImageToText = useCallback(async ()=>{
        if(selectedImage){
            const worker = await createWorker('eng');
            const result = await worker.recognize(selectedImage);
            setTextResult(result.data.text);
            await worker.terminate();
        }
    },[selectedImage,setTextResult])


    const upload = useCallback(async ()=>{
        if(selectedImage){
            const formData = new FormData();
        formData.append('file', selectedImage);
        axios.post('http://localhost:4000/api/factures/upload',formData)
            .catch(error=>console.log(error))
        }
    },[selectedImage])

    useEffect(()=>{
        upload();
        convertImageToText();
    },[selectedImage,upload, convertImageToText])

    const handleChangeImage = (e)=>{
        setSelectedImage(e.target.files[0]);
    }



  return (
    <div className="upload">
        <h2>Image to Text :</h2>
        <input type="file" id="upload" accept="image/*" onChange={handleChangeImage} />
        <label for="upload" class="upload-button">Upload Image</label>
        {selectedImage && (
            <div className="box-image">
                <img src={URL.createObjectURL(selectedImage)} alt="thumb" />
            </div>
        )}
    </div>
  )
}

export default FactureUpload