import React, { forwardRef } from "react";
import './DropdownButton.css';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
const DropdownButton = forwardRef(( props, ref) => {
    const { children, open, toggle } = props;
    return (
        <div className={`dropdown-btn ${open ? 'button-open' : null}`} onClick={toggle} ref={ref}>
            {children}
            <span className='toggle-icon'>
               {open ? <FaChevronUp className="open" /> : <FaChevronDown />}
            </span>
        </div>
    );
});

export default DropdownButton;