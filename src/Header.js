import React from 'react';
import { Link } from 'react-router-dom';


function Header(props) {
    return (
        <>
            <Link to="/">
            <div className="navbar bg-neutral text-neutral-content">
  <button className="btn btn-ghost text-xl">Home</button>
</div>
                
            </Link>
        </>
    );
}

export default Header;