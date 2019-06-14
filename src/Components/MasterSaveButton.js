// @flow

// Necessary Evil
import React from "react";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import { withRouter } from "react-router-dom";
import InstantAction from "../System/InstantAction";
import BackendRequest from "../Models/REST";
import FormGroup from "./Form/FormGroup";
import ipRegex from "ip-port-regex";

/**
 * @class MasterSaveButton
 */
class MasterSaveButton extends React.Component {

	state = {
		error: null
	};

	/**
	 * Submit config to backend
	 */
	onSubmit = () => {

		const { app } = this.props;

		let dhcpSettigns = null;
		let wifiDHCPSettings = null;

		this.setState({
			error: null,
		});

		let isValid = true;

		if (!app.config.lan_dhcp) {

			Object.keys(app.DHCPSettings).forEach((key) => {

				let value = app.DHCPSettings[key];

				if (!ipRegex({ exact: true }).test(value)){
					this.setState({ error: "You have unresolved problems in LAN DHCP settings" });
					isValid = false;
				}

				if (value === "" || value === null) {
					this.setState({ error: "You have to fill all details of LAN DHCP settings" });
					isValid = false;
				}

			});

			dhcpSettigns = {
				lan_dns1: app.DHCPSettings.lan_dns1,
				lan_dns2: app.DHCPSettings.lan_dns2,
				lan_gw: app.DHCPSettings.lan_gw,
				lan_ip: app.DHCPSettings.lan_ip,
				lan_netmask: app.DHCPSettings.lan_netmask,
			};

		}

		if (!app.config.wifi_dhcp) {

			Object.keys(app.WiFiDHCPSettings).forEach((key) => {

				let value = app.WiFiDHCPSettings[key];

				if (!ipRegex({ exact: true }).test(value)){
					this.setState({ error: "You have unresolved problems in WiFi DHCP settings" });
					isValid = false;
				}

				if (value === "" || value === null) {
					this.setState({ error: "You have to fill all details of WiFi DHCP settings" });
					isValid = false;
				}

			});

			wifiDHCPSettings = {
				wifi_dns1: app.WiFiDHCPSettings.wifi_dns1,
				wifi_dns2: app.WiFiDHCPSettings.wifi_dns2,
				wifi_gw: app.WiFiDHCPSettings.wifi_gw,
				wifi_ip: app.WiFiDHCPSettings.wifi_ip,
				wifi_netmask: app.WiFiDHCPSettings.wifi_netmask,
			};

		}

		/**
		 * Prepared payload structure
		 * @type {{restart: string, config: {connection_type: string}}}
		 */
		const payload = {
			config: {
				...app.config,
				...dhcpSettigns,
				...wifiDHCPSettings,
			},
			restart: "application",
		};

		// console.log(payload);

		if (isValid) {

			BackendRequest({
				method: "post",
				endpoint: "config",
				payload: payload,
			});

			InstantAction.setToast("Configuration Saved");
		}
	};

	/**
	 * Final Render
	 * @returns {*}
	 */
	render () {

		const { t } = this.props;

		return (
			<FormGroup>
				<button type="submit"
						onClick={this.onSubmit}
						className="btn btn--animated">{t("button.SaveSettings")}</button>
				{this.state.error !== null ? <div className={"invalid-label"}><p>{this.state.error}</p></div> : ""}
			</FormGroup>
		);
	}

}

/**
 * This function maps the state to a
 * prop called `state`.
 * In larger apps it is often good
 * to be more selective and only
 * map the part of the state tree
 * that is necessary.
 */
const mapStateToProps = state => (
	{
		app: state.app,
	});

/**
 * Exporting part of the React.Component file
 */
export default withRouter(connect(mapStateToProps)(translate()(MasterSaveButton)));