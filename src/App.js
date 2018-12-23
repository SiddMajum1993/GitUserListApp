import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import LoginComponent from './component/login/login.component';
import ListComponent from './component/list/list.component';



import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }


  //define state

  state = {
    user: [
      { username: 'admin', password: 'admin' },
    ]
  }

  //define method to check user exits or not

  checkUserExists = (name) => {
    let count = 0;
    this.state.user.map(item => {
      if (item.username === name) {
        count++;
      }
    });
    return count > 0 ? true : false;
  }

  //difine login handler

  handleLogin = (obj) => {
    //check if user exists
    if (this.checkUserExists(obj.username)) {
      console.log('Logging In in 5secs......');
      this.props.history.push('/userlist');
      
    } else {
      alert("Username dosen't exists");
    }
  }


  render() {
    console.log(this.props)
    return (
      <div>

        <Route path='/' exact render={(props) => (<LoginComponent {...props} onlogin={this.handleLogin} />)} />
        <Route path='/userlist' exact component={ListComponent} />
      </div>
    );
  }
}

export default withRouter(App);
