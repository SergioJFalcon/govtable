import { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';

import DisplayTable from './components/DisplayTable';
import Loading from './components/Loading';
import Header from './components/Header';
import HomePage from './components/HomePage';
import LocalTable from './components/LocalTable';
// import DeleteAllEntries from './components/DeleteAllEntries';

// import { localData } from './data'; //draw objects from local json file

class App extends Component { 

  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          id: '-1',
          Name: 'initial',
          Address: 'initial',
          ZipCode: 'initial',
          Email: 'initial'
        }
      ],
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
      const status = await this.fetchData()
      //fetching data from api
      //axios.get('/api/govtables/').then((res) => this.setState({ list: res.data })).catch((err) => console.log(err));
     
      this.setState(({ listStatus: status }))
    } catch(error) {
      console.log('error: ', error)
    }
  };

  render(){
    const { list, listStatus } = this.state
    const headers = ["Name", "Address", "ZipCode", "Email"];
    return (
      <BrowserRouter>
        <Header />
        <div className='container'>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/localtable">
              <LocalTable />
            </Route>
            <Route path="/resttable">
              {listStatus ? <DisplayTable headers={headers} list={list} /> : <Loading />}
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
