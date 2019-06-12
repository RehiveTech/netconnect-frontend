// @flow

// Necessary Evil
import React from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import RenewButton from "../RenewButton/RenewButton";
import InfoPanel from "../InfoPanel/InfoPanel";
import LanOnlyPanel from "../LanOnlyPanel/LanOnlyPanel";
import LTEPanel from "../LTEPanel/LTEPanel";
import WifiPanel from "../WifiPanel/WifiPanel";
import { SettingsForm } from "../../Forms";
// Import component CSS
import "./NetConnectPanel.css";
import "./SwitchPanel.css";
import BackendRequest from "../../Models/REST";
import { connect } from "react-redux";
import DHCPPanel from "../DHCPPanel/DHCPPanel";
import MasterSaveButton from "../MasterSaveButton";
import InstantAction from "../../Models/Utils/InstantAction";
import { setConfiguration } from "../../App/App.actions";

/**
 * @class NetConnectPanel
 */
class NetConnectPanel extends React.Component {

	/**
	 * PropTypes
	 * @type {{children: shim}}
	 */
	static propTypes = {
		children: PropTypes.any,
		status: PropTypes.any.isRequired,
		config: PropTypes.object.isRequired,
	};

	/**
	 * State
	 * @type {{service: string}}
	 */
	state = {
		service: "lan",
		dhcpStatus: true,
	};

	/**
	 * Switch Service
	 * @param service
	 */
	switchService = (service) => {

		const {app} = this.props;

		InstantAction.dispatch(setConfiguration({
			...app.config,
			connection_type: service,
			}
		));

		this.setState({
			service: service,
		});
	};


	componentDidMount () {
		this.setState({
			service: this.props.app.config.connection_type
		});
	}

	/**
	 * Refresh AP +60 seconds
	 */
	onRefreshAP = () => {
		BackendRequest({
			method: "get",
			endpoint: "refresh",
		});
	};

	/**
	 * On Change DHCP
	 */
	onChangeDHCP = () => {

		this.setState({
			dhcpStatus: !this.state.dhcpStatus
		});

	};

	/**
	 * Final Render
	 * @returns {*}
	 */
	render () {
		const { status } = this.props;

		return <div className="net-connect-panel">

			<RenewButton counter={status.counter} onClick={this.onRefreshAP}/>
			<InfoPanel status={status} service={this.state.service} config={this.props.config}/>

			<LanOnlyPanel
				service={this.state.service}
				onSwitch={this.switchService}
			/>
			<LTEPanel
				service={this.state.service}
				onSwitch={this.switchService}
			/>
			<WifiPanel
				service={this.state.service}
				onSwitch={this.switchService}

			/>
			<br/>
			<div className="settings-form text--left">
				<h3>LAN Configuration</h3>
			</div>

			<DHCPPanel/>
			<div className="settings-form">
				<SettingsForm/>
			</div>
			<div>
				<MasterSaveButton />
			</div>
		</div>;
	}
}



/**
 * This function maps the state to a
 * prop called `state`.
 *
 * In larger apps it is often good
 * to be more selective and only
 * map the part of the state tree
 * that is necessary.
 */
const mapStateToProps = state => (
	{
		app: state.app,
	});


export default connect(mapStateToProps)(translate()(NetConnectPanel));