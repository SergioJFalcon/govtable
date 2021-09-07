import { Component } from 'react';
import axios from 'axios';

import './App.css';

import DisplayTable from './components/DisplayTable';
// import TableModal from './components/TableModal';
import ImportJsonFile from './components/ImportJsonFile';
// import DeleteAllEntries from './components/DeleteAllEntries';

// import { people } from './data'; //draw objects from local json file

class App extends Component { 

  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  
  refreshList = async () => {

    try {
      //fetching data from api
      await axios.get('/api/govtables/').then((res) => this.setState({ list: res.data })).catch((err) => console.log(err));
      
    } catch(error) {
      console.log('error: ', error)
    }
  };

  render(){
    const {list} = this.state
    const headers = ["Name", "Address", "ZipCode", "Email"];
  
    return (
      <div className="App">
        <div className="App-body">
          <h1 className='title'>GovReady Address Book</h1>
          <h3 className='author'>by: Sergio Falcon</h3>
          {
            !list.length ? (<ImportJsonFile />) : <span></span>
          }
          
          {list.length ? <DisplayTable headers={headers} list={list} /> : <h1>Sorry, its Loading</h1>}

        </div>
        
      </div>
    );
  }
}

export default App;
