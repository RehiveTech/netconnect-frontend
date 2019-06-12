// @flow

// Necessary Evil
import React from "react";
import {connect} from "react-redux";
import {translate} from "react-i18next";
import {withRouter} from "react-router-dom";
import InstantAction from "../System/InstantAction";
import BackendRequest from "../Models/REST";

/**
 * @class MasterSaveButton
 */
class MasterSaveButton extends React.Component {

	/**
	 * Submit config to backend
	 */
	onSubmit = () => {

		const { app } = this.props;

		let dhcpSettigns = null;

		if (!app.config.lan_dhcp) {

			dhcpSettigns = {
				lan_dns1: app.DHCPSettings.lan_dns1,
				lan_dns2: app.DHCPSettings.lan_dns2,
				lan_gw: app.DHCPSettings.lan_gw,
				lan_ip: app.DHCPSettings.lan_ip,
				lan_netmask: app.DHCPSettings.lan_netmask,
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
			},
			restart: "application",
		};

		console.log(payload);

		BackendRequest({
			method: "post",
			endpoint: "config",
			payload: payload,
		});

		InstantAction.setToast("Configuration Saved");
	};

	/**
	 * Final Render
	 * @returns {*}
	 */
	render() {

		const {t} = this.props;

		return (
			<button type="submit"
					onClick={this.onSubmit}
					className="btn btn--animated">{t("button.SaveSettings")}</button>
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