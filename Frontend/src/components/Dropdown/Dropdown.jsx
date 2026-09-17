import { useState, useEffect, useRef } from "react";
import './Dropdown.css';
import DropdownButton from "./DropdownButton/DropdownButton";
import DropdownContent from "./DropdownContent/DropdownContent";

const Dropdown = ({ buttonText, content }) => {
    const [open, setOpen] = useState(false);
    const [dropdownTop, setDropdownTop] = useState(0);
    const [dropdownRight, setDropdownRight] = useState(0);
    const dropdownRef = useRef();
    const buttonRef = useRef();
    const contentRef = useRef();
    const toggleDropdown = () => {
        if (!open) {
            const spaceRemaining = window.innerHeight - buttonRef.current.getBoundingClientRect().bottom;
            const contentHeight = contentRef.current.clientHeight;
            const topPostition = spaceRemaining > contentHeight ? null : spaceRemaining - contentHeight;
            
            setDropdownTop(topPostition);
            
        }
        setOpen(!open);
    }

    useEffect(() => {
        const handler = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('click', handler);
        return () => {
            document.removeEventListener('click', handler);
        };
    }, [dropdownRef])

    return (
        <div className="dropdown" ref={dropdownRef}>
            <DropdownButton ref={buttonRef} open={open} toggle={toggleDropdown}>
                {buttonText}
            </DropdownButton>
            <DropdownContent ref={contentRef} open={open} top={dropdownTop} right={dropdownRight}>
                {content}
            </DropdownContent>
        </div>
    );
};

export default Dropdown;