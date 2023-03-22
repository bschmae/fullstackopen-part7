import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { deleteBlog, initializeBlogs, likeBlog } from "../reducers/blogReducer";
import Toggle from "./Toggle"

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleDelete = () => {
    const shouldDelete = window.confirm(`Remove blog: ${blog.title}?`)
    
    if (shouldDelete) {
      dispatch(deleteBlog(blog.id));
      dispatch(setNotification(`successfully deleted blog: ${blog.title}`, 5))
    };
  };

  const handleLike = () => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id};
    dispatch(likeBlog(blogToUpdate.id, blogToUpdate));
    dispatch(setNotification(`you liked: ${blog.title}`, 5));
    dispatch(initializeBlogs());
  }

  return (
  <div className='blog' style={blogStyle}>
      <p>{ blog.title } - { blog.author }</p>
      <Toggle showLabel='view' hideLabel='hide'>
        <p>{ blog.url }</p>
        <br></br>
        <p>likes: { blog.likes }</p> 
        <button onClick={handleLike} id='like-button' >like</button>
        <br></br>
        <p>user: { blog.user ? blog.user.username : '' }</p>
        <br></br>
        <button onClick={ handleDelete }>remove</button>
      </Toggle>
  </div> 
  ); 
};

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => {
    const sortedBlogs = [...blogs];
    return sortedBlogs
      .sort((a, b) => {
        return b.likes - a.likes
      });
    });

    {if (blogs) {
      return (
      blogs.map(blog =>
        <Blog 
          key={blog.id} 
          blog={blog} 
        />
      ));
    };
  };
};

export default BlogList;