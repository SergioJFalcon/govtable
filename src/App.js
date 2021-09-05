import { Component } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

import { people } from './data';
import Table from './components/Table';


class App extends Component { 

  state = {
    list: people
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     list: []
  //   };
  // }

  // componentDidMount() {
  //   this.refreshList();
  // }

  // refreshList = () => {
  //   axios.get('/api/govtables/').then((res) => this.setState({ list: res.data })).catch((err) => console.log(err));
  // };

  render(){
    const {list} = this.state
    // console.log('list of people from app: ', this.state.list)
    const headers = ["Name", "Address", "Zip Code", "Email"];

    return (
      <div className="App">
        <header className="App-header">
          <h1 className='title'>GovReady Address Book</h1>
          <h3 className='author'>by: Sergio Falcon</h3>
          <Table headers={headers} list={list} />
        </header>
      </div>
    );
  }
}

export default App;
