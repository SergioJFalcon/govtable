import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button } from 'reactstrap';
import _ from 'lodash';

import TableModal from './TableModal';

import './DisplayTable.css'
import Loading from './Loading';

class DisplayTable extends Component {
    constructor(props){
        super(props); //header, list of people
        this.state = {
            ...props,
            sort: {
            header: '',
            ascending: true
            },
            modal: false,
            activePerson: {
                Name: '',
                Address: '',
                ZipCode: '',
                Email: ''
            },
            ready: false
        }
    }

    componentDidMount(){
        
        // this.timer = setInterval(() => {
            
            this.refreshList();
            // this.setState({ ready: !this.state.wait })
        // }, 3000)
    }

    // componentWillUnmount() {
    //     clearInterval(this.timer)
    // }

    refreshList = () => {
        axios.get('/api/govtables/').then((res) => this.setState({ list: res.data })).catch((err) => console.log(err));
    };

    toggle = () => {
        this.setState({ modal: !this.state.modal});
    }

    onSortChange = header => {
        let tempList = this.state.list;
        let tempSort = this.state.sort;

        let newSortedList = [];
        if(tempSort.ascending){
            newSortedList = tempList.sort((a, b) => {
                if (a.[header] < b.[header]){
                    return -1;
                }
                if(a.[header] > b.[header]){
                    return 1;
                }
                return 0;
            });
        } else {
            newSortedList = tempList.sort((a,b) => {
                if (a.[header] > b.[header]){
                    return -1;
                }
                if(a.[header] < b.[header]){
                    return 1;
                }
                return 0;
            });

        }
        tempSort.ascending = !tempSort.ascending;
        this.setState({ list: newSortedList, sort: tempSort});
    }

    handleSubmit = (entry) => {
        this.toggle();
        alert("save" + JSON.stringify(entry));
        if(entry.id) {
            axios.put(`/api/govtables/${entry.id}/`, entry).then((res) => this.refreshList());
            return;
        }
        axios.post('/api/govtables/', entry).then((res) => this.refreshList());
    };

    deleteEntry = (entry) => {
        alert("deleting ", JSON.stringify(entry));
        axios.delete(`/api/govtables/${entry.id}/`).then((res) => this.refreshList());
    };

    createEntry = () => {
        const newEntry = {
            Name: '',
            Address: '',
            ZipCode: '',
            Email: ''
        }

        this.setState({ activePerson: newEntry, modal: !this.state.modal });
    };

    editEntry = (entry) => {
        this.setState({ activePerson: entry, modal: !this.state.modal });
    };

    render() {
        const { headers, list } = this.state;
        
        return(
            <div className="table-container">
                
                <Table striped bordered hover>
                    <thead >
                        <tr>
                            {headers.map((header, index) => (
                                    <th key={index}>
                                        <div 
                                            className="header-button"
                                            onClick={() => this.onSortChange(header)}
                                        >
                                            {header}
                                        </div>
                                    </th>
                                )
                            )}
                            <th colSpan="2">
                                <Button 
                                    color="btn btn-primary"
                                    className="new-entry-button"
                                    onClick={this.createEntry}
                                >
                                    Add new entry
                                </Button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                         {_.map(list, (person) => {
                             return (
                                <tr key={person.id}>
                                    <td>{person.Name}</td>
                                    <td>{person.Address}</td>
                                    <td>{person.ZipCode}</td>
                                    <td>{person.Email}</td>
                                    <td>
                                        <button 
                                            className="btn btn-secondary mr-2"
                                            onClick={() => this.editEntry(person)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td>
                                        <button 
                                            className="btn btn-danger"
                                            onClick={() => this.deleteEntry(person)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                             )
                         })}
                    </tbody>
                </Table>
                {this.state.modal ? 
                    (
                        <TableModal
                            activePerson={this.state.activePerson}
                            toggle={this.toggle}
                            onSave={this.handleSubmit}
                        />
                    ) 
                    : null
                }
            </div>
        );
    }
};

export default DisplayTable;