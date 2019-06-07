// @flow

// Necessary Evil
import React from "react";
import PropTypes from "prop-types";
import {translate} from "react-i18next";
import {Col, Row} from "react-flexbox-grid";
// Import component CSS
import "./LanOnlyPanel.css";
import SwitchButton from "../SwitchButton/SwitchButton";


/**
 * @class LanOnlyPanel
 */
class LanOnlyPanel extends React.Component {

    /**
     * PropTypes
     * @type {{children: shim}}
     */
    static propTypes = {
        children: PropTypes.any,
        service: PropTypes.string,
        onSwitch: PropTypes.func.isRequired,
        config: PropTypes.object,
        onSubmitChanges: PropTypes.func.isRequired,
    };

    /**
     * On Switch
     */
    onSwitch = () => {

        const {onSwitch, config, onSubmitChanges} = this.props;

        const wifiConfig = config.wifi;
        const lanConfig = config.lan;
        const lteConfig = config.lte;

        /**
         * Data
         * @type {{wifi_ssid: string, lte_apn: string, lte_number: *, wifi_dhcp: boolean, wifi_key: string, lan_dhcp: boolean}}
         */
        const data = {
            lan_dhcp: lanConfig.ipv4.dhcp,
            lte_apn: lteConfig.apn,
            lte_number: lteConfig.number,
            wifi_dhcp: wifiConfig.ipv4.dhcp,
            wifi_key: wifiConfig.key,
            wifi_ssid: wifiConfig.ssid,
            connection_type: "lan"
        };

        // Switch LAN local state
        onSwitch("lan");

        // Submit changes to backend
        onSubmitChanges(data);
    };

    /**
     * Final Render
     * @returns {*}
     */
    render() {

        const {service} = this.props;

        return <div className="lan-only-panel switch-panel">
            <div className={"switch-panel__headline"}>
                <Row start="xs">
                    <Col xs>
                        LAN only
                    </Col>
                    <Col xs className={"switch-panel__right"}>
                        <SwitchButton checked={service === "lan"} onClick={ ()=> this.onSwitch("lan") } disabled={service === "lan"}/>
                    </Col>
                </Row>
            </div>
        </div>;
    }
}

export default translate()(LanOnlyPanel);