// @flow

// Necessary Evil
import React from "react";
import { translate } from "react-i18next";
import FormGroup from "../Components/Form/FormGroup";
import { connect } from "react-redux";
import InstantAction from "../Models/Utils/InstantAction";
import { setConfiguration } from "../App/App.actions";

/**
 * @class WifiForm
 *
 */
class WifiForm extends React.Component {

	/**
	 * State
	 * @type {{formData: {}, expectingResponse: boolean, errorMessage: null}}
	 */
	state = {
		expectingResponse: false,
		errorMessage: null,
		key: "",
		ssid: "",
	};

	/**
	 * Component will mount
	 */
	componentWillMount () {

		const { app } = this.props;

		this.setState({
			ssid: app.config.wifi_ssid,
			key: app.config.wifi_key,
		});
	}

	/**
	 *
	 * @param nextProps
	 * @param nextContext
	 */
	componentWillReceiveProps (nextProps: Readonly<P>, nextContext: any): void {

		if (this.props.app.config.wifi_ssid !== nextProps.app.config.wifi_ssid) {

			this.setState({
				ssid: nextProps.app.config.wifi_ssid
			});
		}

	}

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

			// Save change to store
			const data = {
				...app.config,
				wifi_key: this.state.key,
				wifi_ssid: this.state.ssid,
			};

			InstantAction.dispatch(setConfiguration(data));
		});
	};

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

		/**
		 * Final Output
		 * @type {{}}
		 */
		return <form onSubmit={this.onSubmit} className={"form text--left"}>
			{error}
			<FormGroup>
				<label htmlFor="">{"SSID network name"}</label>
				<input onChange={this.handleInputChange}
					   value={this.state.ssid}
					   type="text"
					   tabIndex={1}
					   name="ssid"
					   id="ssid"
					   autoFocus={true}
					   placeholder={""}/>
			</FormGroup>
			<FormGroup>
				<label htmlFor="key">Password</label>
				<input onChange={this.handleInputChange}
					   value={this.state.key}
					   type="text"
					   tabIndex={2}
					   name="key"
					   id="key"
					   placeholder={""}/>
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

export default connect(mapStateToProps)(translate()(WifiForm));


