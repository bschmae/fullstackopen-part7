import { useEffect } from 'react';

import BlogList from './components/Blog';
import { UserList, UserDisplay } from './components/UserList';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Toggle from './components/Toggle';
import Navbar from './components/Navbar';

import './App.css';
import { initializeBlogs } from './reducers/blogReducer';
import { initUser, loggout } from './reducers/loginReducer';
import { initializeUsers } from './reducers/userReducer';

import { useDispatch, useSelector } from 'react-redux';
import { useMatch, Routes, Route } from 'react-router-dom';



const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initUser());
    dispatch(initializeUsers());
  }, []);

  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);

  const handleLoggout = () => {
    dispatch(loggout());
  };

  const match = useMatch('/users/:id');
  const userToDisplay = match 
  ? users.find(user => user.id === match.params.id) : null;

  if (user === null) {
    return (
    <div>
      <h1>Log in to application </h1>
      <Notification  />
      <Toggle showLabel='login' hideLabel='cancel'>
        <LoginForm />
      </Toggle>
    </div>
        )
      };

  return (
    <div> 
      <p>{user.username} logged in <button onClick={handleLoggout}>logout</button></p>
      <Navbar />     
      <h1>Blogs</h1> 
      <Notification  />
      <Routes >
        <Route path='/' element={<BlogList />} ></Route>
        <Route path='/users/:id'  element={<UserDisplay user={userToDisplay} />}></Route>
        <Route path='/blogform' element={<BlogForm />}></Route>
        <Route path='/users' element={<UserList />} ></Route>
      </Routes>
    </div>
  );
};
export default App;