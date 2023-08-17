import React, { useState } from 'react'

const LeftSideBar = () => {
    const [select, setSelect] = useState(0);

    const selectItem = (select) => {
        console.log('LeftSideBar', select);
        setSelect(select);
      };

    return (
        <div className="left-sidenav mm-active">
            <ul className="metismenu left-sidenav-menu mm-show">
                <li className={select === 0 ? "mm-active" : ""}>
                    <a className="nav-link "  onClick={(e) => {
                        e.preventDefault();
                        selectItem(0)
                    }}>
                        <i className="ti-control-record" />
                        Analytics
                    </a>
                </li>
                <li className={select === 1 ? "mm-active" : ""}>
                    <a className="nav-link"  onClick={(e) => {
                        e.preventDefault();
                        selectItem(1)
                    }}>
                        <i className="ti-control-record" />
                        CRM
                    </a>
                </li>
                <li className={select === 2 ? "mm-active" : ""}>
                    <a className="nav-link"  onClick={(e) => {
                        e.preventDefault();
                        selectItem(2)
                    }}>
                        <i className="ti-control-record" />
                        Helpdesk
                    </a>
                </li>
                <li className={select === 3 ? "mm-active" : ""}>
                    <a className="nav-link"  onClick={(e) => {
                        e.preventDefault();
                        selectItem(3)
                    }}>
                        <i className="ti-control-record" />
                        Sales
                    </a>
                </li>
            </ul>
        </div>

    )
}

export default LeftSideBar;