import axios from "axios"

const ImportJsonFile = (status) => {    
   
    const addEntriesFromJSONFile = () => {
        const data = require('../dataSep-3-2021.json');
 
        data.map((entry) =>
            addNewEntry(entry)
        );
    }
    


    const addNewEntry = (entry) => {
        alert('Please wait 10 seconds to finish adding all 100 entries')
        let newEntry = {
            Name: entry.Name,
            Address: entry.Address,
            ZipCode: entry.['Zip Code'],
            Email: entry.Email
        }
        axios.post("/api/govtables/", newEntry);
    }
 
    return (
        <div className="json-import">
            <button
                onClick={() => addEntriesFromJSONFile()}>
                Import dataSep-3-2021.json
            </button>
        </div>
    )
    
}
export default ImportJsonFile;