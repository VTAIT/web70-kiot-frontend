import React from "react";

const AppSearch = () => {
    return (
        <ul className="list-unstyled topbar-nav mb-0">
            <li>
                <button className="nav-link button-menu-mobile waves-effect waves-light">
                    <i className="ti-menu nav-icon" />
                </button>
            </li>
            <li className="hide-phone app-search">
                <form role="search" className>
                    <input type="text" id="AllCompo" placeholder="Search..." className="form-control" />
                    <a href><i className="fas fa-search" /></a>
                </form>
            </li>
        </ul>
    );
};

export default AppSearch;