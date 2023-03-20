import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Toggle from './components/Toggle';
import blogService from './services/blogs';
import loginService from './services/login';
import './App.css';
import { setNotification } from './reducers/notificationReducer';
import { useDispatch } from 'react-redux';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    };
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password
      }); 

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
    };
  };

  const handleLoggout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };

  const handleBlogForm = async (title, author, url) => {
    try {
      const blog = await blogService.create({
        title, 
        author, 
        url,
      });
      setBlogs(blogs.concat(blog));
      dispatch(setNotification(`successfuly created blog: ${blog.title}`, 5));
    } catch (error) {
      dispatch(setNotification(`${error}`, 5));
    }
  };

  const updateBlog = async (blog) => {
    const responseBlog = await blogService.update(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    );

    const newBlogs = blogs.map((currentBlog) => currentBlog.id === blog.id ? 
    { ...currentBlog, likes: currentBlog.likes + 1} : currentBlog);

    setBlogs(newBlogs);
  
  };
  
  const deleteBlog = async (blog) => {
    try {
    await blogService.remove(blog.id);

    const newBlogs = blogs.filter((currentBlog) => currentBlog.id !== blog.id);

    setBlogs(newBlogs);
    dispatch(setNotification(`successfuly deleted blog: ${blog.title}`, 5))

  } catch (error) {
    dispatch(setNotification(`${error}`, 5))
  };
};


  if (user === null) {
    return (
    <div>
      <h1>Log in to application </h1>
      <Notification  />
      <Toggle showLabel='login' hideLabel='cancel'>
        <LoginForm 
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword} 
        />
      </Toggle>
    </div>
        )
      };

  return (
    <div>     
      <h1>Blogs</h1> 
      <Notification  />
      <p>{user.username} logged in <button onClick={handleLoggout}>logout</button></p>
      <BlogForm handleBlogForm={handleBlogForm}/>
      {blogs
      .sort((a, b) => {
        return b.likes - a.likes
      })
      .map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
      )}
    </div>
  );
};
export default App;