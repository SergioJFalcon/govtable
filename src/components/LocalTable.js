import React, { Component } from 'react';
import { Table } from 'reactstrap';
import _ from 'lodash';

import localJson from '../dataSep-3-2021.json'

import './DisplayTable.css'

class LocalTable extends Component {
    constructor(props){
        super(props); //header, list of people
        this.state = {
            ...props,
            sort: {
            header: '',
            ascending: true
            },
            listOfHeaders: []
        }
    }

    componentDidMount() {
         
         if(this.state.list === undefined){
            this.setState({listOfHeaders: ['Name', 'Address', 'Zip Code', 'Email']})
            this.setState({list: localJson});
        } else if(this.state.list.length > 0){
            this.setState({listOfHeaders: Object.keys(this.state.list[1])});
         }
    }

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
    render() {
        const { list } = this.state;
        const headers = this.state.listOfHeaders;
        
        return(
            <div className="container">
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
                            </tr>
                        </thead>
                        <tbody>
                            {_.map(list, (person, index) => (
                                <tr key={index}>
                                    <td>{person.Name}</td>
                                    <td>{person.Address}</td>
                                    <td>{person.['Zip Code']}</td>
                                    <td>{person.Email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
};

export default LocalTable;