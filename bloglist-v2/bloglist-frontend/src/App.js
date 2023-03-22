import { useEffect } from 'react';
import BlogList from './components/Blog';
import UserList from './components/UserList';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Toggle from './components/Toggle';
import './App.css';
import { initializeBlogs } from './reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';
import { initUser, loggout } from './reducers/loginReducer';
import { initializeUsers } from './reducers/userReducer';


const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initUser());
    dispatch(initializeUsers());
  }, []);

  const handleLoggout = () => {
    dispatch(loggout());
  };

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
      <h1>Blogs</h1> 
      <Notification  />
      <p>{user.username} logged in <button onClick={handleLoggout}>logout</button></p>
      <UserList />
      <BlogForm />
      <BlogList />
    </div>
  );
};
export default App;