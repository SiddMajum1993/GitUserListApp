import React from 'react';


import avatar from '../assets/avatar.png';
import './registration.component.css';

const RegistrationComponent = (props) => {

    let registerObj = {
        name:'',
        uname:'',
        password:'',
        valid: false,
    };

    let handleChangeName = (event)=>{
        registerObj.name = event.target.value;
    };

    let handleChangeUname = (event)=>{
        registerObj.uname = event.target.value;
    };

    let handleChangePassword = (event)=>{
        registerObj.password = event.target.value;
    };

    let handleChangeRePassword = (event)=>{
        if(event.target.value === registerObj.password){
            registerObj.valid = true;
        }
    };

    let handleSumit = (event)=>{ 
        if(registerObj.valid){
            props.onRegister(registerObj);
        }else{
            alert("Password Mismatch");
        }

        event.preventDefault();
    };

    return (
        <div className="registration">
            <div className='registrationForm'>
                <img src={avatar} className='avatar' />

                <h1>Register Here</h1>
                <form onSubmit={handleSumit}>
                    <p>Name</p>
                    <input type='text' placeholder='Enter Name' onChange={handleChangeName} />
                    <p>Username</p>
                    <input type='text' placeholder='Enter Username' onChange={handleChangeUname} />
                    <p>Password</p>
                    <input type='password' placeholder='Enter Password' onChange={handleChangePassword} />
                    <input type='password' placeholder='Re-Enter Password' onChange={handleChangeRePassword} />
                    <input type='Submit' value='Register' />
                </form>
            </div>
        </div>
    );
}

export default RegistrationComponent;
