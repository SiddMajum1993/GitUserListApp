import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/avatar.png';

import './login.component.css';

class LoginComponent extends Component {

    constructor(props){
        super(props);
    }

    //define state 
        state={
            username:'',
            password:'',
        }
    //dife handlers

    handleSumit = (event)=>{

        console.log('Username : ',this.state.username);
        console.log('Password : ',this.state.password);
        this.props.onlogin(this.state);
        event.preventDefault();
    }

    handleChangeUname = (event)=>{
        let uname = event.target.value;
        this.setState({ username: uname });
    }

    handleChangePassword = (event)=>{
        let pword = event.target.value;
        this.setState({ password: pword });
    }

    render() {
        return (
            <div className="login">
                <div className='loginForm'>
                    <img src={avatar} className='avatar' />

                    <h1>Login</h1>
                    <form onSubmit={this.handleSumit}>
                        <p>Username</p>
                        <input type='text' placeholder='Enter Username' onChange={this.handleChangeUname}/>
                        <p>Password</p>
                        <input type='password' placeholder='Enter Password' onChange={this.handleChangePassword}/>
                        <input type='Submit' value='Login' />
                        <Link to='/register' className='registerRoute'>New User? Register Here!</Link>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginComponent;