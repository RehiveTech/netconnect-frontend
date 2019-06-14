// @flow

// Necessary Evil
import React from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { Col, Row } from "react-flexbox-grid";
// Import component CSS
import "./InfoPanel.css";

/**
 * @class InfoPanel
 */
class InfoPanel extends React.Component {

	/**
	 * PropTypes
	 * @type {{children: shim}}
	 */
	static propTypes = {
		children: PropTypes.any,
		status: PropTypes.any,
		service: PropTypes.string,
		config: PropTypes.object
	};

	/**
	 * Final Render
	 * @returns {*}
	 */
	render () {

		const { status, service, config } = this.props;

		let defaultGateway = "";
		let showDNS = true;
		let colorTheme = "lan";

		if (status.ncstatus.gw.ifname == null) {
			defaultGateway = "No default GW";
			showDNS = false;
		} else {
			if (status.ncstatus.gw.ifname == status.ncstatus.lan.ifname) {
				defaultGateway = "LAN";
				colorTheme = "lan";
			} else if (status.ncstatus.gw.ifname == status.ncstatus.wifi_client.ifname) {
				defaultGateway = "WiFi";
				colorTheme = "wifi_client";
			} else if (status.ncstatus.gw.ifname == status.ncstatus.lte.ifname) {
				defaultGateway = "LTE";
				colorTheme = "lte";
			}
		}
		let serviceTranslated = service;

		if (service === "wifi") {
			serviceTranslated = "wifi_client";
		}

		return <div className={"info-panel info-panel--" + colorTheme}>
			<Row start="xs">
				<Col xs>
					<h2>LAN</h2>
				</Col>
				<Col xs className={"text--right"}>
					Link <strong>{status.lan.ifstate}</strong><br/>
					{status.lan.address !== null && status.lan.address !== "" ? <span>IP {status.lan.address}</span> : ""}
				</Col>
			</Row>
			<br/>
			{service !== "lan" ?
				<Row start="xs">
					<Col xs>
						<h2>{service.toUpperCase().replace("_", " ")}</h2>
					</Col>
					<Col xs className={"text--right"}>

						<strong>{status[serviceTranslated].status.replace("_", " ")}</strong>{service === "wifi_client" || service === "wifi" ?
						<span>{status.wifi_client.status === "CONNECTED" ?
							<span>, SSID <strong>{status.wifi_client.wireless_status.ssid}</strong></span> : ""}</span> : ""}<br/>

						{
							service === "lte" &&
							status.lte.status === "CONNECTED" && status.lte.operator_info !== undefined
								?
								<span>{status.lte.operator_info.operator}, {status.lte.modem_info.vendor} {status.lte.modem_info.product}, RSSI {status.lte.modem_signal.rssi}</span> : ""}
						{(service === "wifi_client" || service === "wifi") &&
						status.wifi_client.status === "CONNECTED"
							?
							<span>IP {status.wifi_client.address}, RSSI {status.wifi_client.wireless_status.rssi}</span>
							: ""}
					</Col>
				</Row> : ""}
			<br/>
			<Row start="xs">
				<Col xs>
					<h2>Default gateway</h2>
				</Col>
				<Col xs className={"text--right"}>
					<strong>{defaultGateway}</strong><br/>
					{status.ncstatus.gw.ip !== null && status.ncstatus.gw.ip !== "" ?
						<span>IP {status.ncstatus.gw.ip}, </span> : ""}
					{showDNS ? <span>DNS {status.ncstatus.ncstatus.dns[0]}</span> : ""}

				</Col>
			</Row>
		</div>;
	}
}

export default translate()(InfoPanel);