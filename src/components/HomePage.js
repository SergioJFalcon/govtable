import React, { useState } from 'react'
import LocalTable from './LocalTable';
import './HomePage.css';

const HomePage = () => {
    const [fileName, setFileName] = useState('');
    const [listFromFile, setListFromFile] = useState([]);
    const headers = ["Name", "Address", "Zip Code", "Email"];

    const handleFiles = (e) => {
        const reader = new FileReader();
        let file = e.target.files[0];
        setFileName(file.name);
      
        reader.readAsText(e.target.files[0]);
    
        reader.onload = function () {
          
        try{
            let json = JSON.parse(reader.result)
            setListFromFile(json);
        } catch(err){
            alert('error when trying to parse json', err);
        }
        };
        reader.onerror = function () {
          console.log(reader.error);
        };
    }
   
    return (

        <div className="homepage-container">
            <div className="container">
                <div className="instructions">
                    <h1>Upload a JSON File to be inserted into a Table</h1>
                    <div className="button-wrap">
                        <label className="button" htmlFor="uploadFile">Upload File </label>
                        <input id="uploadFile" type="file" data-testid="upload-input" onChange={(e) => handleFiles(e, 0)}></input>
                    </div>              
                </div>
                {fileName ? <h2>Table created using {fileName}</h2> : null}
                {(listFromFile.length > 0) ? <LocalTable headers={headers} list={listFromFile} /> : null}
            </div>
        </div>
    )
};

export default HomePage;