import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/loginReducer';
import blogService from '../services/blogs';

const LoginForm = () => {
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);

    const dispatch = useDispatch();

    const handleLogin = (event) => {
        event.preventDefault();
        dispatch(login({
                username,
                password,
            }));
    
            setUsername('');
            setPassword('');
    };

    return (    
    <form onSubmit={handleLogin}>
        <div>
        username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            id='username'
        />
        </div>
        <div>
        password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            id='password'
        />
        </div>
        <button id='login-button' type="submit">login</button>
  </form>)
};

export default LoginForm;