// @flow

// Necessary Evil
import React from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import FormGroup from "../Components/Form/FormGroup";
import InstantAction from "../Models/Utils/InstantAction";
import { setConfiguration } from "../App/App.actions";

/**
 * @class SettingsForm
 *
 */
class SettingsForm extends React.Component {

	/**
	 * State
	 * @type {{formData: {}, expectingResponse: boolean, errorMessage: null}}
	 */
	state = {
		expectingResponse: false,
		errorMessage: null,
		timeout: 60,
		password: "",
	};

	/**
	 * Handle Input Change
	 * @param event
	 */
	handleInputChange = (event) => {

		const { app } = this.props;
		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;

		// Local save
		this.setState({
			[name]: value
		}, () => {

			// Handle empty password
			let apKey = (this.state.password === "") ? null : this.state.password;

			// Save change to store
			const data = {
				...app.config,
				// New Changes
				ap_key: apKey,
				ap_timeout: parseInt(this.state.timeout, 10),
			};

			InstantAction.dispatch(setConfiguration(data));
		});
	};

	/**
	 * Component will mount
	 */
	componentWillMount () {

		const { app } = this.props;

		this.setState({
			timeout: parseInt(app.config.ap_timeout, 10),
			password: app.config.ap_key,
		});
	}

	/**
	 * Final Render
	 * @returns {*}
	 */
	render () {

		/**
		 * @info Translation function, className
		 */
		const { t } = this.props;
		/**
		 * @info Error variable
		 */
		let error = "";

		/**
		 * @info Handling Error Message
		 */
		if (this.state.errorMessage !== null) {
			error = <div style={{ color: "orange", fontWeight: 700 }}><i
				className="icon-cube"/> {t("formError." + this.state.errorMessage)}</div>;
		}

		let passwordNull = this.state.password === null ? "" : this.state.password;

		/**
		 * Final Output
		 * @type {{}}
		 */
		return <form className={"form text--left"}>
			<h3>Wi-Fi Access Point (AP) Settings</h3>
			{error}
			<FormGroup>
				<label htmlFor="ssid">SSID network name</label>
				<input onChange={this.handleInputChange} value={"aurora-netconnect"} type="text" disabled={true}
					   name="ssid" id="ssid"/>
			</FormGroup>
			<FormGroup>
				<label htmlFor="timeout">AP visibility timeout [s]</label>
				<input onChange={this.handleInputChange} value={this.state.timeout} type="number" tabIndex={1}
					   name="timeout" id="timeout"
					   autoFocus={true} placeholder={""}/>
			</FormGroup>
			<FormGroup>
				<label htmlFor="password">Password (min. 8 characters)</label>
				<input onChange={this.handleInputChange} value={passwordNull} type="password" tabIndex={2}
					   minLength={8}
					   name="password"
					   id="password"
					   placeholder="Enter password or leave blank"/>
			</FormGroup>
		</form>;
	}
}

/**
 * Map State To Props
 * @param state
 * @return {{app: (*|appReducer)}}
 */
const mapStateToProps = state => (
	{
		app: state.app,
	});

export default connect(mapStateToProps)(translate()(SettingsForm));