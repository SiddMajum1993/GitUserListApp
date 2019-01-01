import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Fire from './config/config';

import LoginComponent from './component/login/login.component';
import ListComponent from './component/list/list.component';
import RegistrationComponent from './component/registration/registration.component';



import './App.css';

// global authentication observer

Fire.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    console.log('[Global Auth Object triggered ] : User Info --> ', user);
    // ...
  } else {
    // User is signed out.
    console.log('[Global Auth Object triggered ] : error Info --> ', user);
  }
});

class App extends Component {

  constructor(props) {
    super(props);
  }

  //define state

  state = {
        username: '',
  }


  //difine login handler

  handleLogin = (obj) => {

    /* Login with given credentials 
        if username password is incorrect then show message 
          else if login fails then redirect to regiser page
        else redirect to list page
    */

    Fire.auth().signInWithEmailAndPassword(obj.username, obj.password)
      .then((response) => {
        console.log('[Successful sign in: ]', response);
        this.setState({ username: response.user.email });
        this.props.history.push('/userlist');
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('[error in sign in: ]', error);
        // ...
      });

  }

  //define registration handler

  handleRegistration = (obj) => {
    Fire.auth().createUserWithEmailAndPassword(obj.uname, obj.password)
      .then((res) => {
        console.log(res);
        this.setState({ username: res.email });
        this.props.history.push('/userlist');
      }).catch((error) => {
        console.log(error);
      });

  }


  // define logoutHandler

  handleLogout = () => {
    Fire.auth().signOut();
    this.setState({ username: '' });
    this.props.history.push('/');
  }

  render() {
    //console.log(this.props)

    // only allow valid user to log in;
    let userlist = (this.state.username !== '') ?
      <Route path='/userlist' exact render={(props) => (<ListComponent {...props} onLogout={this.handleLogout} />)} /> :
      <Route path='/userlist' exact render={(props) => (<LoginComponent {...props} onlogin={this.handleLogin} />)} />
    return (
      <div>
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            timeout={{ enter: 300, exit: 300 }}
            classNames={'fade'}
          >
            <Switch location={this.props.location}>
              {/* <Route path='/userlist' exact component={ListComponent} /> */}
              {userlist}
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
