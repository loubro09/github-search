import { NavLink } from 'react-router-dom';

import './css/NavBar.css'

export const NavBar = () => {
    return ( 
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-items">
                    <NavLink to="/">Search Projects</NavLink>
                    <NavLink to="/saved">Saved Projects</NavLink>
                </div>
                <hr></hr>
                <h1>GitHub Project Searcher</h1>
            </div>
        </nav>
    );
}