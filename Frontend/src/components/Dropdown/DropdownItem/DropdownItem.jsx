import React from "react";
import './DropdownItem.css';

const DropdownItem = ({ children, onClick }) => {
    return (
        <div className="dropdown-item" role="menuitem" onClick={onClick}>
            {children}
        </div>
    );
};

export default DropdownItem;