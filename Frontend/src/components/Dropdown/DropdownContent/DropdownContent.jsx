import { forwardRef } from "react";
import './DropdownContent.css';

const DropdownContent = forwardRef((props, ref) => {
    const { children, open, top } = props;
    return (
        <div className={`dropdown-content ${open ? 'content-open' : null}`} ref={ref} style={{ top: top !== null ? `${top}px` : null }}>
            {children}
        </div>
    );
});

export default DropdownContent;