import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';


import us_flag from '../../images/flags/us_flag.png';
import vn_flag from '../../images/flags/vn_flag.png';
import { FaChevronDown } from 'react-icons/fa';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}

    </div>
));

const CustomItem = React.forwardRef(({ children, onClick }, ref) => (
    <div
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}

    </div>
));


const NavBar = () => {
    const [titleDropdown, setTitleDropdown] = useState("English");

    const selectItem = (select) => {
        console.log(select)
        if (select === "1")
            setTitleDropdown("English");
        else if (select === "2")
            setTitleDropdown("Tiếng Việt");
    };

    return (
        <nav className="navbar-custom">
            <ul className="list-unstyled topbar-nav float-right mb-0">
                <li className="hidden-sm">
                    <Dropdown>
                        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                            <a
                                className="nav-link dropdown-toggle waves-effect waves-light"
                                href=""
                            >
                                {titleDropdown}
                                <img src={us_flag} height="24" alt="us_flag" style={{ marginLeft: 5 }} />
                                <FaChevronDown size={12} style={{ marginLeft: 5 }} />
                            </a>

                        </Dropdown.Toggle>

                        <Dropdown.Menu >
                            <Dropdown.Item onClick={(s) => selectItem("1")}>
                                <span> English </span>
                                <img src={us_flag} alt="us_flag" className="ml-2 float-right" height={18} />
                            </Dropdown.Item>
                            <Dropdown.Item onClick={(s) => selectItem("2")}>
                                <span>Tiếng Việt </span>
                                <img src={vn_flag} alt="vn_flag" className="ml-2 float-right" height={18} />
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
                <li className="dropdown notification-list">
                    <a className="nav-link dropdown-toggle arrow-none waves-light waves-effect" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                        <i className="ti-bell noti-icon" />
                        <span className="badge badge-danger badge-pill noti-icon-badge">2</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right dropdown-lg pt-0">
                        <h6 className="dropdown-item-text font-15 m-0 py-3 bg-primary text-white d-flex justify-content-between align-items-center">
                            Notifications <span className="badge badge-light badge-pill">2</span>
                        </h6>
                        <div className="slimscroll notification-list">
                            {/* item*/}
                            <a href="#" className="dropdown-item py-3">
                                <small className="float-right text-muted pl-2">2 min ago</small>
                                <div className="media">
                                    <div className="avatar-md bg-primary">
                                        <i className="la la-cart-arrow-down text-white" />
                                    </div>
                                    <div className="media-body align-self-center ml-2 text-truncate">
                                        <h6 className="my-0 font-weight-normal text-dark">Your order is placed</h6>
                                        <small className="text-muted mb-0">Dummy text of the printing and industry.</small>
                                    </div>{/*end media-body*/}
                                </div>{/*end media*/}
                            </a>{/*end-item*/}
                            {/* item*/}
                            <a href="#" className="dropdown-item py-3">
                                <small className="float-right text-muted pl-2">10 min ago</small>
                                <div className="media">
                                    <div className="avatar-md bg-success">
                                        <i className="la la-group text-white" />
                                    </div>
                                    <div className="media-body align-self-center ml-2 text-truncate">
                                        <h6 className="my-0 font-weight-normal text-dark">Meeting with designers</h6>
                                        <small className="text-muted mb-0">It is a long established fact that a reader.</small>
                                    </div>{/*end media-body*/}
                                </div>{/*end media*/}
                            </a>{/*end-item*/}
                            {/* item*/}
                            <a href="#" className="dropdown-item py-3">
                                <small className="float-right text-muted pl-2">40 min ago</small>
                                <div className="media">
                                    <div className="avatar-md bg-pink">
                                        <i className="la la-list-alt text-white" />
                                    </div>
                                    <div className="media-body align-self-center ml-2 text-truncate">
                                        <h6 className="my-0 font-weight-normal text-dark">UX 3 Task complete.</h6>
                                        <small className="text-muted mb-0">Dummy text of the printing.</small>
                                    </div>{/*end media-body*/}
                                </div>{/*end media*/}
                            </a>{/*end-item*/}
                            {/* item*/}
                            <a href="#" className="dropdown-item py-3">
                                <small className="float-right text-muted pl-2">1 hr ago</small>
                                <div className="media">
                                    <div className="avatar-md bg-warning">
                                        <i className="la la-truck text-white" />
                                    </div>
                                    <div className="media-body align-self-center ml-2 text-truncate">
                                        <h6 className="my-0 font-weight-normal text-dark">Your order is placed</h6>
                                        <small className="text-muted mb-0">It is a long established fact that a reader.</small>
                                    </div>{/*end media-body*/}
                                </div>{/*end media*/}
                            </a>{/*end-item*/}
                            {/* item*/}
                            <a href="#" className="dropdown-item py-3">
                                <small className="float-right text-muted pl-2">2 hrs ago</small>
                                <div className="media">
                                    <div className="avatar-md bg-info">
                                        <i className="la la-check-circle text-white" />
                                    </div>
                                    <div className="media-body align-self-center ml-2 text-truncate">
                                        <h6 className="my-0 font-weight-normal text-dark">Payment Successfull</h6>
                                        <small className="text-muted mb-0">Dummy text of the printing.</small>
                                    </div>{/*end media-body*/}
                                </div>{/*end media*/}
                            </a>{/*end-item*/}
                        </div>
                        {/* All*/}
                        <a href="javascript:void(0);" className="dropdown-item text-center text-primary">
                            View all <i className="fi-arrow-right" />
                        </a>
                    </div>
                </li>
                <li className="dropdown">
                    <a className="nav-link dropdown-toggle waves-effect waves-light nav-user" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                        <img src="../assets/images/users/user-1.png" alt="profile-user" className="rounded-circle" />
                        <span className="ml-1 nav-user-name hidden-sm">Amelia <i className="mdi mdi-chevron-down" /> </span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#"><i className="ti-user text-muted mr-2" /> Profile</a>
                        <a className="dropdown-item" href="#"><i className="ti-wallet text-muted mr-2" /> My Wallet</a>
                        <a className="dropdown-item" href="#"><i className="ti-settings text-muted mr-2" /> Settings</a>
                        <a className="dropdown-item" href="#"><i className="ti-lock text-muted mr-2" /> Lock screen</a>
                        <div className="dropdown-divider mb-0" />
                        <a className="dropdown-item" href="#"><i className="ti-power-off text-muted mr-2" /> Logout</a>
                    </div>
                </li>
            </ul>{/*end topbar-nav*/}

        </nav>
    );
};

export default NavBar;