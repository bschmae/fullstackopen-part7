import { useDispatch, useSelector } from "react-redux";

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
            <td >{user.name} - </td>
            <td >{blogCount}</td>
        </tr>
    );
};

const UserList = () => {
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

export default UserList;