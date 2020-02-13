import React from 'react';

const Header = ({ onServiceChange }) => {
    return (
        <div className="header d-flex">
            <h3>
                <a href="/#">SwaAPi</a>
            </h3>
            <ul className="d-flex">
                <li>
                    <a href="/#">People</a>
                </li>
                <li>
                    <a href="/#">Planets</a>
                </li>
                <li>
                    <a href="/#">Starships</a>
                </li>
            </ul>
            <button onClick={onServiceChange} className="btn btn-primary btn-sm">
                Change
            </button>
        </div>
    );
};

export default Header;