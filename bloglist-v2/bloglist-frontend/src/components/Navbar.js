import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <div><Link to='/' > Home </Link></div>
            <div><Link to='/blogform'> Create Blog </Link></div>
            <div><Link to='/users'> Users </Link></div>
        </div>
    );
};

export default Navbar;