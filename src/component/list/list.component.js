import React, { Component } from 'react';

import _ from 'lodash';
import './list.component.css';

const LIST_PER_PAGE_START = 4;

class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            filteredUsers: [],
            renderedUsers: [],
            searchString: '',
            startIndex: 0,
            lastIndex: LIST_PER_PAGE_START,
            lengthOfUsers: 0,
        }
    }


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
                    this.setState({ renderedUsers: [...this.renderUsers(this.state.filteredUsers)]});   
                    console.log("[ComponentDidMount] ", this.state.users);
                },
                (error) => {
                    console.log(error);
                })
    }

    //method to initialize list of users to render

    renderUsers = (arr) => {

        let renderedUser = [];
        arr.map((item, index) => {
            if (index >= this.state.startIndex && index < this.state.lastIndex) {
                renderedUser.push(item);
            }
        });
        this.setState({ startIndex: this.state.lastIndex });
        this.setState({ lastIndex: this.state.lastIndex + LIST_PER_PAGE_START });
        return renderedUser;
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
        this.setState({ renderedUsers: [...this.renderUsers(this.state.filteredUsers)]});
    }

    //Page handlers
    leftPage = () => {

    }

    rightPage = () => {

    }



    render() {

        console.log('[ListComponent: ]', this.state);
        let val = null;
        if (this.state.renderedUsers !== null) {
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
                    {this.state.renderedUsers.map(item => {
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
                <button onClick={this.leftPage} className='leftButton'>Left</button>
                <button onClick={this.rightPage} className='rightButton'>Right</button>
            </div>
        );
    }
}

export default UserList;