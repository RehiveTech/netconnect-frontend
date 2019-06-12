// @flow
import React from "react";
import { PrivateSceneWrapper } from "../Components/Wrappers";
import { translate } from "react-i18next";
import { withRouter } from "react-router-dom";
import BackendRequest from "../Models/REST";
import NetConnectPanel from "../Components/NetConnectPanel/NetConnectPanel";
import { connect } from "react-redux";
import InstantAction from "../Models/Utils/InstantAction";
import { setConfiguration, setDHCP } from "../App/App.actions";

/**
 * @class LandingScene
 */
class LandingScene extends React.Component {

	/**
	 * State
	 * @type {{status: {wifi_client, lan, counter, lte, ncstatus}}}
	 */
	state = {
		status: null,
		config: null,
		refresh: null,
		configReady: false,
	};

	/**
	 * Load status
	 */
	loadConfig () {

		BackendRequest({
			endpoint: "config",
			self: this,
			onSuccess: (response) => {

				let data = response.data;

				let config = {
					connection_type: data.connection_type,
					lan_dhcp: data.lan.ipv4.dhcp,
					lte_apn: data.lte.apn,
					lte_number: data.lte.number,
					wifi_dhcp: data.wifi.ipv4.dhcp,
					wifi_key: data.wifi.key,
					wifi_ssid: data.wifi.ssid,
					ap_key: data.ap_key,
					ap_timeout: parseInt(data.ap_timeout, 10),
				};

				// Dispatch to store
				InstantAction.dispatch(setConfiguration(config));

				if(!config.lan_dhcp){
					let values = data.lan.ipv4;

					const DHCPSettings = {
						lan_dns1: values.dns[0],
						lan_dns2: values.dns[1],
						lan_gw: values.gw,
						lan_ip: values.ip,
						lan_netmask: values.netmask,
					};

					InstantAction.dispatch(setDHCP(DHCPSettings));

				}


				// Set local State
				this.setState({
					config: data,
					configReady: true
				});

				// Refresh status info
				this.refreshStatus();
			}
		});
	}

	/**
	 * Refresh Status
	 */
	refreshStatus = () => {

		BackendRequest({
			method: "get",
			endpoint: "status",
			self: this,
			onSuccess: (response) => {

				console.log(response.data);

				this.setState({
					status: response.data
				});
			},
		});

	};

	/**
	 * Component did mount
	 */
	componentDidMount (): void {

		this.loadConfig();

		let self = this;
		let refresh = setInterval(function () {
			self.refreshStatus();
		}, 1000);

		this.setState({
			refresh: refresh
		});

	};

	/**
	 * Component Will Unmount
	 */
	componentWillUnmount (): void {

		clearInterval(this.state.refresh);

	}

	/**
	 * Final Render
	 * @returns {*}
	 */
	render () {

		if (this.state.status === null) {
			return <div style={{ padding: "2rem" }}>Web server is not available</div>;
		}

		if (this.state.configReady) {
			return (
				<PrivateSceneWrapper>
					<NetConnectPanel status={this.state.status} config={this.state.config}/>
				</PrivateSceneWrapper>
			);
		}
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

/**
 * Exporting part of the React.Component file
 */
export default connect(mapStateToProps)(withRouter(translate()(LandingScene)));