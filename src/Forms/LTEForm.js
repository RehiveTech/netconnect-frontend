// @flow

// Necessary Evil
import React from "react";
import { translate } from "react-i18next";
import FormGroup from "../Components/Form/FormGroup";
import { connect } from "react-redux";
import InstantAction from "../Models/Utils/InstantAction";
import { setConfiguration } from "../App/App.actions";

/**
 * @class LTEForm
 *
 */
class LTEForm extends React.Component {

	/**
	 * State
	 * @type {{formData: {}, expectingResponse: boolean, errorMessage: null}}
	 */
	state = {
		expectingResponse: false,
		errorMessage: null,
		apn: "",
		number: "",
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

			// Save change to store
			const data = {
				...app.config,
				lte_apn: this.state.apn,
				lte_number: this.state.number,
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
			apn: app.config.lte_apn,
			number: app.config.lte_number
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

		/**
		 * Final Output
		 * @type {{}}
		 */
		return <form onSubmit={this.onSubmit} className={"form text--left"}>
			{error}
			<FormGroup>
				<label htmlFor="">APN</label>
				<input onChange={this.handleInputChange}
					   value={this.state.apn}
					   type="text"
					   tabIndex={1}
					   name="apn"
					   id="apn"
					   autoFocus={true}
					   placeholder={""}
				/>
			</FormGroup>
			<FormGroup>
				<label htmlFor="">Number</label>
				<input onChange={this.handleInputChange}
					   value={this.state.number}
					   type="text"
					   tabIndex={2}
					   name="number"
					   id="number"
					   placeholder={"Enter number"}
				/>
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

export default connect(mapStateToProps)(translate()(LTEForm));