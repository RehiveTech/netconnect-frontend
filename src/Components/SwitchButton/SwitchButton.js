import React from "react";
// import Shnyaga from "./ShnyagaSwitchButton";
import PropTypes from "prop-types";

import "./SwitchButton.css";

/**
 * @class SwitchButton
 */
export default class SwitchButton extends React.Component {

    /**
     * Default Props
     * @type {{checked: boolean, onClick: Function, disabled: boolean, className: string, offColor: string, onColor: string, size: string}}
     */
    static defaultProps = {
        checked: false,
        onClick: (function() {}),
        disabled: false,
        className: "",
        offColor: "#e6e6e6",
        onColor: "#51ac5c",
        size: "normal"
    };

    /**
     * PropTypes
     * @type {{checked: shim, onClick: shim, disabled: shim, className: shim, offColor: shim, onColor: shim, size: shim}}
     */
    static propTypes = {
        checked: PropTypes.bool,
        onClick: PropTypes.func,
        disabled: PropTypes.bool,
        className: PropTypes.string,
        offColor: PropTypes.string,
        onColor: PropTypes.string,
        size: PropTypes.string
    };

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {checked: this.props.checked};
        this.handleClick = this.handleClick.bind(this);
    }

    /**
     *
     * @param nextProps
     * @param nextState
     */
    componentWillReceiveProps(nextProps, nextState) {
        this.setState({checked: nextProps.checked});
    }

    /**
     * Handle Click
     * @param e
     */
    handleClick(e) {
        e.preventDefault();
        if(!this.props.disabled) {

            this.props.onClick();
            this.setState({checked: !this.state.checked});
        }
    };


    /**
     * Final Render
     * @returns {*}
     */
    render() {

        const className = [
            "shnyaga",
            this.props.className,
            "shnyaga--" + this.props.size,
            this.state.checked ? "shnyaga--checked" : "",
            this.props.disabled ? "shnyaga--disabled" : ""
        ].join(" ").replace(/\s{2,}/g," ").trim();

        const bgColor = this.state.checked ? {backgroundColor: this.props.onColor} : {backgroundColor: this.props.offColor};

        return (
            <div style={ bgColor } className={ className } onClick={ this.handleClick } />
        );
    }
}