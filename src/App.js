import { Component } from 'react';
import axios from 'axios';

import './App.css';

import DisplayTable from './components/DisplayTable';
import ImportJsonFile from './components/ImportJsonFile';
import Loading from './components/Loading';
// import DeleteAllEntries from './components/DeleteAllEntries';

// import { people } from './data'; //draw objects from local json file

class App extends Component { 

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      listStatus: null
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  fetchData = () => {
    return axios.get('/api/govtables/').then((response) => {
      return response.data;
    });
  };

 
  refreshList = async() => {
    try { 
      const listStatus = await this.fetchData()
      //fetching data from api
      //axios.get('/api/govtables/').then((res) => this.setState({ list: res.data })).catch((err) => console.log(err));

      this.setState(() => ({listStatus}))
    } catch(error) {
      console.log('error: ', error)
    }
  };

  render(){
    const { list, listStatus } = this.state
    const headers = ["Name", "Address", "ZipCode", "Email"];
  
    return (
      <div className="App">
        <div className="App-body">
          <h1 className='title'>GovReady Address Book</h1>
          <h3 className='author'>by: Sergio Falcon</h3>
          {
            !list.length ? null : (<ImportJsonFile />)
          }
          
          {!listStatus ? <Loading /> : <DisplayTable headers={headers} list={list} />}
        </div>
        
      </div>
    );
  }
}

export default App;
