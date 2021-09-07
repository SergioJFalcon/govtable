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

  refreshList = () => {
    axios.get('/api/govtables/').then((res) => this.setState({ list: res.data })).catch((err) => console.log(err));
  };

  render(){
    const {list} = this.state
    const headers = ["Name", "Address", "ZipCode", "Email"];
  
    return (
      <div className="App">
        <header className="App-header">
          <h1 className='title'>GovReady Address Book</h1>
          <h3 className='author'>by: Sergio Falcon</h3>
          {
            !list.length ? <ImportJsonFile status={'false'} />: null
          }
          
          <DisplayTable headers={headers} list={list} />
        </header>
        
      </div>
    );
  }
}

export default App;
