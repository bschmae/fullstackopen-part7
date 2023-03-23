import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

function countBlogs(array) {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        count++;
    };
    return count;
};

const User = ({ user }) => {
    let blogCount = countBlogs(user.blogs);

    return (
            <tr>
                <td >
                    <Link to={`/users/${user.id}`}>{user.name} - </Link>
                </td>
                <td >{blogCount}</td>
            </tr>
    );
};

export const UserDisplay = ({ user }) => {

    return (
        <div>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
            <ul>
                {user.blogs.map(blog => <li key={blog.id} >{blog.title}</li>)}
            </ul>
        </div>
    );
};

export const UserList = () => {
    const users = useSelector((state) => state.users);
    return (
        <div>
            <h2>Users</h2>
            <table >
                <thead>
                    <tr>
                        <td></td>
                        <td>Blogs created</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => 
                        <User 
                            key={user.id}
                            user={user}
                        />
                    )}
                </tbody>
            </table>
        </div>
    );
};


