import { NavLink } from 'react-router-dom';

export const NavBar = () => {
    return ( 
        <nav className="navbar">
            <div className="navbar-container">
                <h1>GitHub Project Searcher</h1>
                <div className="navbar-items">
                    <NavLink to="/">Search Projects</NavLink>
                    <NavLink to="/saved">Saved Projects</NavLink>
                </div>
            </div>
        </nav>
    );
}