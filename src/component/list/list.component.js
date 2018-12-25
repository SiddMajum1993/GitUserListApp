import React, { Component } from 'react';

import _ from 'lodash';
import './list.component.css';

const LIST_PER_PAGE = 4;

class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            filteredUsers: [],
            renderedUsers: [],
            searchString: '',
            start: 0,
            last: 0,
            lengthOfUsers: 0,
        }

        this.renderUsers = this.renderUsers.bind(this);
        this.sortHandler = this.sortHandler.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
        this.leftPage = this.leftPage.bind(this);
        this.rightPage = this.rightPage.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
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
                    this.setState({ filteredUsers: [...temp], users: [...temp] }, function () {
                        this.setState({ lengthOfUsers: this.state.filteredUsers.length }, function () {

                            console.log('[ComponentDidMount]-->', this.state);
                            this.renderUsers(this.state.start);
                        });
                    });

                },
                (error) => {
                    console.log(error);
                })
    }

    //method to initialize list of users to render

    renderUsers = (start = 0, filterArr = this.state.filteredUsers) => {
        if (start - this.state.lengthOfUsers < 0) {

            let arr = [];
            let i = start;
            while (i < start + LIST_PER_PAGE) {
                arr.push(filterArr[i]);
                i++;
            }

            arr = _.without(arr, undefined);

            this.setState({ start: i, last: i + LIST_PER_PAGE, filteredUsers: [...filterArr], renderedUsers: [...arr] });
        }
    }


    //SortHandler
    sortHandler = () => {
        // let switching = true;
        // let rows, shouldSwitch, tableRows, x, y, i;
        // let table = document.getElementsByClassName('userTable');
        // tableRows = table[0].getElementsByTagName('TR');
        // console.log(tableRows.length);
        // while (switching) {
        //     switching = false;
        //     for (i = 1; i < (tableRows.length - 1); i++) {
        //         x = tableRows[i].getElementsByTagName('TD')[1];
        //         y = tableRows[i + 1].getElementsByTagName('TD')[1];

        //         if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        //             shouldSwitch = true;
        //             break;
        //         }
        //     }

        //     if (shouldSwitch) {
        //         if (i < tableRows.length - 1) {
        //             tableRows[i].parentNode.insertBefore(tableRows[i + 1], tableRows[i]);
        //             switching = true;
        //         }
        //     }
        // }

        let filteredUsers = [...this.state.filteredUsers];
        filteredUsers = _.sortBy(filteredUsers, ['login']);
        //console.log(filteredUsers);
        this.renderUsers(undefined,filteredUsers);

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

        this.setState({ lengthOfUsers: temp.length }, function () {

            this.renderUsers(this.state.start, temp);
        });

    }

    //Page handlers
    leftPage = () => {
        if (this.state.start > 0) {
            let visibleList = this.state.last % 4;
            let start = (this.state.start - visibleList) > 0 ? (this.state.start - visibleList) : 0;
            let i = start - LIST_PER_PAGE;
            let arr = [];
            while (i < start) {
                arr.push(this.state.filteredUsers[i]);
                i++;
            }

            this.setState({ last: start, start: start - LIST_PER_PAGE, renderedUsers: [...arr] });
        } else {
            alert('No more data');
        }
    }

    rightPage = () => {
        if (this.state.start - this.state.lengthOfUsers < 0) {
            let i = this.state.start;
            let arr = [];
            while (i < Math.min(this.state.start + LIST_PER_PAGE, this.state.lengthOfUsers)) {
                arr.push(this.state.filteredUsers[i]);
                i++;
            }

            this.setState({ start: i, last: Math.min(i + LIST_PER_PAGE, this.state.lengthOfUsers), lengthOfUsers: this.state.filteredUsers.length, renderedUsers: [...arr] });
        } else {
            alert('No more data');
        }
    }

    //logout handler

    logoutHandler = ()=>{
        this.props.history.push('/');
    }



    render() {

        console.log('[ListComponent: ]', this.state);
        let val = null;
        let keys = null;
        if (this.state.renderedUsers.length !== 0) {
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

            keys = (
                <div>

                    <button onClick={this.leftPage} className='leftButton'>Left</button>
                    <button onClick={this.rightPage} className='rightButton'>Right</button>
                </div>
            );

        }

        return (
            <div className='background'>
                <div className='listContainer'>
                    <div className='searchbar'>
                        <input type='text' placeholder='Search Name' onChange={(event) => this.searchHandler(event)} />

                        <button id='sortButton' onClick={this.sortHandler}>Sort</button>
                        <button onClick={this.logoutHandler}>Logout</button>
                    </div>
                    {val}
                    {keys}
                </div>
            </div>
        );
    }
}

export default UserList;