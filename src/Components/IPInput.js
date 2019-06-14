// @flow

// Necessary Evil
import React from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import FormGroup from "./Form/FormGroup";
import ipRegex from "ip-port-regex";

// Import component CSS
// import "./IPInput.css";

/**
 * @class IPInput
 */
class IPInput extends React.Component {

	/**
	 * PropTypes
	 * @type {{children: shim}}
	 */
	static propTypes = {
		children: PropTypes.any,
		value: PropTypes.any,
		label: PropTypes.string,
		property: PropTypes.string,
		onChange: PropTypes.func,
	};

	/**
	 * State
	 * @type {{invalid: boolean}}
	 */
	state = {
		invalid: false,
	};

	/**
	 * Handle Input Change
	 * @param event
	 */
	handleInputChange = (event) => {

		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;

		this.checkValue(value);
		this.props.onChange(event);

	};

	/**
	 * Check value
	 * @param value
	 */
	checkValue (value) {
		if (ipRegex({ exact: true }).test(value)) {
			this.setState({
				invalid: false,
			});
		} else {
			this.setState({
				invalid: true,
			});
		}
	}

	/**
	 * Component will mount
	 */
	componentWillMount () {
		this.checkValue(this.props.value);
	}

	/**
	 * Final Render
	 * @returns {*}
	 */
	render () {

		let errorClass = this.state.invalid ? "invalid" : "";

		return <FormGroup>
			<label htmlFor={this.props.property}>{this.props.label}</label>
			<input onChange={this.handleInputChange}
				   value={this.props.value}
				   type="text"
				   name={this.props.property}
				   id={this.props.property}
				   required
				   placeholder={""}
				   className={errorClass}
			/>
			{this.state.invalid ? <em className="invalid-label">Invalid IP address</em> : ""}
		</FormGroup>;
	}
}

export default translate()(IPInput);