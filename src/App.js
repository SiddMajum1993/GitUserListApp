import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";

import LoginComponent from './component/login/login.component';
import ListComponent from './component/list/list.component';
import RegistrationComponent from './component/registration/registration.component';



import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }


  //define state

  state = {
    user: [
      { username: 'admin', password: 'admin', name: 'admin' },
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

  // define method to register new user

  registerUser = (obj) => {
    let userArray = [...this.state.user];
    let userObj = {
      'username': obj.uname,
      'password': obj.password,
      'name': obj.name,
    }
    userArray.push(userObj);
    this.setState({ user: userArray });
    this.props.history.push('/');
  }


  //validate login

  validateLogin = (obj) => {
    let ind = 0;
    this.state.user.map((item, index) => {
      if (item.username === obj.username) {
        ind = index;
      }
    });

    if (this.state.user[ind].password === obj.password)
      return true;
    else
      return false;
  }

  //difine login handler

  handleLogin = (obj) => {
    //check if user exists
    if (this.checkUserExists(obj.username)) {
      console.log('Logging In in 5secs......');
      // ToDo username password validation
      if (this.validateLogin(obj)) {

        this.props.history.push('/userlist');
      } else {
        alert('Usename Password Incorrect');
      }

    } else {
      alert("Username dosen't exists");
    }
  }

  //define registration handler

  handleRegistration = (obj) => {
    if (this.checkUserExists(obj.uname)) {
      alert("Username already exists. Try another one!");
    } else {
      this.registerUser(obj);
    }
  }




  render() {
    console.log(this.props)
    return (
      <div>
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            timeout={{ enter: 300, exit: 300 }}
            classNames={'fade'}
          >
            <Switch location={this.props.location}>
              <Route path='/userlist' exact component={ListComponent} />
              <Route path='/register' exact render={(props) => (<RegistrationComponent {...props} onRegister={this.handleRegistration} />)} />
              <Route path='/' exact render={(props) => (<LoginComponent {...props} onlogin={this.handleLogin} />)} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

export default withRouter(App);
