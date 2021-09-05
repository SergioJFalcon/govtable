import React, { Component } from 'react';
// import axios from 'axios';

class Table extends Component {
    constructor(props){
        super(props); //header, list of people
        this.state = {
            ...props,
            sort: {
            header: '',
            ascending: true
            }
        }

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
        // console.log('lets see if it sorts: ', newSortedList);
        tempSort.ascending = !tempSort.ascending;
        this.setState({ list: newSortedList, sort: tempSort});
    }

    render() {
        const { headers, list } = this.state;

        return(
            <table>
                <thead>
                    <tr>
                        {headers.map((header, index) => {
                            return (
                                <th key={index}>
                                    <button 
                                        type="button" 
                                        onClick={() => this.onSortChange(header)}
                                    >
                                        {header}
                                    </button>
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                    
                <tbody>
                    {list.map((person, index) => (
                        <tr key={index}>
                            <td>{person.Name}</td>
                            <td>{person.Address}</td>
                            <td>{person.['Zip Code']}</td>
                            <td>{person.Email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
};

export default Table;