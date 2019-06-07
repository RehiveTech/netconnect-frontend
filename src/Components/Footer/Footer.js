// @flow

// Necessary Evil
import React from "react";
import PropTypes from "prop-types";
import {translate} from "react-i18next";
// Import component CSS
import "./Footer.css";


/**
 * @class Footer
 */
class Footer extends React.Component {

    /**
     * PropTypes
     * @type {{children: shim}}
     */
    static propTypes = {
        children: PropTypes.any,
    };

    /**
     * Final Render
     * @returns {*}
     */
    render() {
        return <div className="footer">
            &copy; RehiveTech spol. s r.o.
        </div>;
    }
}

export default translate()(Footer);