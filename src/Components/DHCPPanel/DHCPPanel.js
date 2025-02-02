// @flow

// Necessary Evil
import React from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { Col, Row } from "react-flexbox-grid";
// Import component CSS
import "./DHCPPanel.css";
import SwitchButton from "../SwitchButton/SwitchButton";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import InstantAction from "../../Models/Utils/InstantAction";
import { setConfiguration, setDHCP } from "../../App/App.actions";
import IPInput from "../IPInput";

/**
 * @class DHCPPanel
 */
class DHCPPanel extends React.Component {

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
	 * @type {{netmask: string, primaryDNS: string, secondaryDNS: string, lanIpAddress: string, defaultGateway: string}}
	 */
	state = {
		lanIpAddress: "",
		netmask: "",
		defaultGateway: "",
		primaryDNS: "",
		secondaryDNS: "",
		lan_dhcp: true,
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
				lan_dns1: this.state.primaryDNS,
				lan_dns2: this.state.secondaryDNS,
				lan_gw: this.state.defaultGateway,
				lan_ip: this.state.lanIpAddress,
				lan_netmask: this.state.netmask,
			};

			InstantAction.dispatch(setDHCP(data));
		});
	};

	onSwitch = () => {

		const { app } = this.props;

		this.setState({
			lan_dhcp: !this.state.lan_dhcp,
		}, () => {
			InstantAction.dispatch(setConfiguration({
				...app.config,
				lan_dhcp: this.state.lan_dhcp
			}));
		});

	};

	/**
	 * Component Will Mount
	 */
	componentWillMount () {

		const { app } = this.props;

		let status = app.config.lan_dhcp;

		if (!status) {
			this.setState({
				lanIpAddress: app.DHCPSettings.lan_ip,
				netmask: app.DHCPSettings.lan_netmask,
				defaultGateway: app.DHCPSettings.lan_gw,
				primaryDNS: app.DHCPSettings.lan_dns1,
				secondaryDNS: app.DHCPSettings.lan_dns2,
			});
		}

		this.setState({
			lan_dhcp: app.config.lan_dhcp
		});
	}

	/**
	 * Final Render
	 * @returns {*}
	 */
	render () {

		return <div className="dhcp-panel switch-panel">
			<div className={"switch-panel__headline"}>
				<Row start="xs">
					<Col xs>
						LAN DHCP
					</Col>
					<Col xs className={"switch-panel__right"}>
						<SwitchButton checked={this.state.lan_dhcp} onClick={this.onSwitch}/>
					</Col>
				</Row>
			</div>

			{!this.state.lan_dhcp ?
				<form className={"form"}>
					<div className={"switch-panel__inner-box"}>
						<Row>
							<Col xs className=" text--left">
								<IPInput label={"LAN IP address"} onChange={this.handleInputChange}
										 value={this.state.lanIpAddress} property={"lanIpAddress"}/>
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
export default withRouter(connect(mapStateToProps)(translate()(DHCPPanel)));