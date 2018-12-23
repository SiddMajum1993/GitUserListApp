import React, { Component } from 'react';

import _ from 'lodash';
import './list.component.css';

class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            filteredUsers: [],
            searchString: '',
        }
    }

    //state

    //load data by API call
    componentDidMount() {
        const url = 'https://api.github.com/users';
        //console.log('component did mount');
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    let temp = [];
                    result.map(item => {
                        temp.push(item);
                    })
                    this.setState({ users: [...temp] });
                    this.setState({ filteredUsers: [...temp] });
                    console.log("[ComponentDidMount] ", this.state.users);
                },
                (error) => {
                    console.log(error);
                })
    }


    //SortHandler
    sortHandler = () => {
        let switching = true;
        let rows, shouldSwitch, tableRows, x, y, i;
        let table = document.getElementsByClassName('userTable');
        tableRows = table[0].getElementsByTagName('TR');
        console.log(tableRows.length);
        while (switching) {
            switching = false;
            for (i = 1; i < (tableRows.length - 1); i++) {
                x = tableRows[i].getElementsByTagName('TD')[1];
                y = tableRows[i + 1].getElementsByTagName('TD')[1];

                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }

            if (shouldSwitch) {
                if (i < tableRows.length - 1) {
                    tableRows[i].parentNode.insertBefore(tableRows[i + 1], tableRows[i]);
                    switching = true;
                }
            }
        }
    }


    //SearchHandler

    searchHandler = (event) => {
        let data = event.target.value;
        console.log('[searchHandler :]', this.state.searchString);
        let temp = _.map(this.state.users, function (o) {
            if (o.login.includes(data))
                return o;
        });

        temp = _.without(temp, undefined);
        this.setState({ filteredUsers: [...temp] });
    }


    render() {

        console.log('[ListComponent: ]', this.state);
        let val = null;
        if (this.state.filteredUsers !== null) {
            val = (
                <table className='userTable'>
                    <tr>
                        <th>ProfileImage</th>
                        <th>UserName</th>
                        <th>UserID</th>
                        <th>TestData</th>
                        <th>TestData</th>
                        <th>UserType</th>
                    </tr>
                    {this.state.filteredUsers.map(item => {
                        return (<tr>
                            <td>
                                <img src={item.avatar_url} className='profileImage' />
                            </td>
                            <td>{item.login}</td>
                            <td>{item.id}</td>
                            <td>TestData</td>
                            <td>TestData</td>
                            <td>{item.type}</td>
                        </tr>)
                    })}
                </table>
            );

        }

        return (
            <div className='background'>
                <div className='listContainer'>
                    <div className='searchbar'>
                        <input type='text' placeholder='Search Name' onChange={(event) => this.searchHandler(event)} />

                        <button onClick={this.sortHandler}>Sort</button>
                    </div>
                    {val}
                </div>
            </div>
        );
    }
}

export default UserList;