// @flow

// Necessary Evil
import React from "react";
import PropTypes from "prop-types";
import {translate} from "react-i18next";
import {Col, Row} from "react-flexbox-grid";
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
    render() {

        const {status, service, config} = this.props;

        let serviceTranslated = service;

        if (service === "wifi") {
            serviceTranslated = "wifi_client";
        }

        return <div className={"info-panel info-panel--" + serviceTranslated}>
            <Row>
                <Col xs>
                    <h1> {service.replace("_", " ")} </h1>
                </Col>
            </Row>
            <Row start="xs">
                <Col xs>
                    <h2>LAN</h2>
                </Col>
                <Col xs className={"text--right"}>
                    Link <strong>{status.lan.ifstate}</strong><br/>
                    IP {status.lan.address}
                </Col>
            </Row>
            <br/>
            {service !== "lan" ?
                <Row start="xs">
                    <Col xs>
                        <h2>{service.toUpperCase().replace("_", " ")}</h2>
                    </Col>
                    <Col xs className={"text--right"}>

                        <strong>{status[serviceTranslated].status.replace("_", " ")}</strong> {service === "wifi_client" || service === "wifi" ?
                        <span>, SSID <strong>{config.wifi.ssid}</strong></span> : ""}<br/>

                        {
                            service === "lte" &&
                            status.lte.status !== "NOT_AVAILABLE" &&
                            status.lte.status !== "INACTIVE" &&
                            status.lte.status !== "NOT_CONNECTED"
                                ?

                                <span>{status.lte.operator_info.operator}, {status.lte.modem_info.vendor} {status.lte.modem_info.product}, RSSI {status.lte.modem_signal.rssi}</span> : ""}
                        {(
                            service === "wifi_client" || service === "wifi") &&
                        status.wifi_client.wireless_status !== null
                            ?
                            <span>IP {status.wifi_client.address}, RSSI {status.wifi_client.wireless_status.rssi}</span>
                            : ""
                        }
                    </Col>
                </Row> : ""}
            <br/>
            <Row start="xs">
                <Col xs>
                    <h2>Default gateway</h2>
                </Col>
                <Col xs className={"text--right"}>
                    <strong>{service.toUpperCase().replace("_", " ")}</strong><br/>
                    IP {status.ncstatus.gw.ip}, DNS {status.ncstatus.ncstatus.dns[0]}
                </Col>
            </Row>
        </div>;
    }
}

export default translate()(InfoPanel);