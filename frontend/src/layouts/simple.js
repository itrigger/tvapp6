import React from "react";
import PropTypes from "prop-types";


export default function SimpleLayout({ children }) {
    console.log(children);
    return (
        <>
            {children}
        </>
    );
}
SimpleLayout.propTypes = {
    children: PropTypes.element.isRequired
};