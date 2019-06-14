// @flow

// Necessary Evil
import React from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { Col, Row } from "react-flexbox-grid";
// Import component CSS
import "./WiFiDHCPPanel.css";
import SwitchButton from "../SwitchButton/SwitchButton";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import InstantAction from "../../Models/Utils/InstantAction";
import { setConfiguration, setWiFiDHCP } from "../../App/App.actions";
import IPInput from "../IPInput";

/**
 * @class WiFiDHCPPanel
 */
class WiFiDHCPPanel extends React.Component {

	/**
	 * PropTypes
	 * @type {{children: shim}}
	 */
	static propTypes = {
		children: PropTypes.any,
		service: PropTypes.string,
	};

	/**
	 * State
	 * @type {{netmask: string, primaryDNS: string, secondaryDNS: string, wifiIpAddress: string, defaultGateway: string}}
	 */
	state = {
		wifiIpAddress: "",
		netmask: "",
		defaultGateway: "",
		primaryDNS: "",
		secondaryDNS: "",
		wifi_dhcp: true,
	};

	/**
	 * Handle Input Change
	 * @param event
	 */
	handleInputChange = (event) => {

		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;

		// Local save
		this.setState({
			[name]: value
		}, () => {

			// Save change to store
			const data = {
				wifi_dns1: this.state.primaryDNS,
				wifi_dns2: this.state.secondaryDNS,
				wifi_gw: this.state.defaultGateway,
				wifi_ip: this.state.wifiIpAddress,
				wifi_netmask: this.state.netmask,
			};

			InstantAction.dispatch(setWiFiDHCP(data));
		});
	};

	onSwitch = () => {

		const { app } = this.props;

		this.setState({
			wifi_dhcp: !this.state.wifi_dhcp,
		}, () => {
			InstantAction.dispatch(setConfiguration({
				...app.config,
				wifi_dhcp: this.state.wifi_dhcp
			}));
		});

	};

	/**
	 * Component Will Mount
	 */
	componentWillMount () {

		const { app } = this.props;

		let status = app.config.wifi_dhcp;

		if (!status) {
			this.setState({
				wifiIpAddress: app.WiFiDHCPSettings.wifi_ip,
				netmask: app.WiFiDHCPSettings.wifi_netmask,
				defaultGateway: app.WiFiDHCPSettings.wifi_gw,
				primaryDNS: app.WiFiDHCPSettings.wifi_dns1,
				secondaryDNS: app.WiFiDHCPSettings.wifi_dns2,
			});
		}

		this.setState({
			wifi_dhcp: app.config.wifi_dhcp
		});
	}

	/**
	 * Final Render
	 * @returns {*}
	 */
	render () {

		return <div className="wifi-dhcp-panel switch-panel">
			<div className={"switch-panel__headline"}>
				<Row start="xs">
					<Col xs>
						WiFi DHCP
					</Col>
					<Col xs className={"switch-panel__right"}>
						<SwitchButton checked={this.state.wifi_dhcp} onClick={this.onSwitch}/>
					</Col>
				</Row>
			</div>

			{!this.state.wifi_dhcp ?
				<form className={"form"}>
					<div className={"switch-panel__inner-box"}>
						<Row>
							<Col xs className=" text--left">
								<IPInput label={"WiFi IP address"} onChange={this.handleInputChange}
										 value={this.state.wifiIpAddress} property={"wifiIpAddress"}/>
								<IPInput label={"Netmask"} onChange={this.handleInputChange} value={this.state.netmask}
										 property={"netmask"}/>
								<IPInput label={"Default gateway"} onChange={this.handleInputChange}
										 value={this.state.defaultGateway} property={"defaultGateway"}/>
								<IPInput label={"Primary DNS"} onChange={this.handleInputChange}
										 value={this.state.primaryDNS} property={"primaryDNS"}/>
								<IPInput label={"Secondary DNS"} onChange={this.handleInputChange}
										 value={this.state.secondaryDNS} property={"secondaryDNS"}/>
							</Col>
						</Row>
					</div>
				</form> : ""
			}
		</div>;
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
export default withRouter(connect(mapStateToProps)(translate()(WiFiDHCPPanel)));