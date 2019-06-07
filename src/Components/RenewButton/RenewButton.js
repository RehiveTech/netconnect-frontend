// @flow

// Necessary Evil
import React from "react";
import PropTypes from "prop-types";
import {translate} from "react-i18next";
// Import component CSS
import "./RenewButton.css";


/**
 * @class RenewButton
 */
class RenewButton extends React.Component {

    /**
     * PropTypes
     * @type {{children: shim}}
     */
    static propTypes = {
        children: PropTypes.any,
        onClick: PropTypes.func.isRequired,
    };

    /**
     * Final Render
     * @returns {*}
     */
    render() {
        return <div className="renew-button__wrapper">
            <button className="renew-button" onClick={this.props.onClick}>
                <div>{this.props.counter}</div>
                <i className="icon-refresh"/>
            </button>
        </div>;
    }
}

export default translate()(RenewButton);