import axios from "axios"

const DeleteAllEntries = ({list}) => {
    
    const deleteEntries = (list) => {
        console.log('deleteEntries list: ', !list)
        if(!list){
            return null;
        }
        else {
            console.log('goes in else')
            console.log(list)
            for(let i = 1; i < 5; i++){
                console.log('now its in for loop to delete')
                console.log('does it auto deleting: ', i)
                axios.delete(`/api/govtables/${i}`).then((res) => console.log('goodbye ', list[i].Name))
            
            }
        }
    }
    
    return(
        <div>
            <button
                type="button"
                onClick={() => deleteEntries(list)}
            >
                Delete All entries
            </button>
        </div>
    )
}
export default DeleteAllEntries;