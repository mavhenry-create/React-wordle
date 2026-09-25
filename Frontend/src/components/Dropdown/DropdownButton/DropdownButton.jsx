import React, { forwardRef } from "react";
import './DropdownButton.css';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
const DropdownButton = forwardRef(( props, ref) => {
    const { children, open, toggle } = props;
    return (
        <button className={`dropdown-btn ${open ? 'button-open' : null}`}
         onClick={toggle}
          ref={ref}
          type="button"
          aria-expanded={open}
          aria-haspopup="menu">
            {children}
            <span className='toggle-icon'>
               {open ? <FaChevronUp className="open" /> : <FaChevronDown />}
            </span>
        </button>
    );
});

export default DropdownButton;