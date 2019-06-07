// @flow

// Necessary Evil
import React from "react";
import PropTypes from "prop-types";
import {translate} from "react-i18next";
import {Col, Row} from "react-flexbox-grid";
// Import component CSS
import "./DHCPPanel.css";
import SwitchButton from "../SwitchButton/SwitchButton";
import FormGroup from "../Form/FormGroup";


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
        onSwitch: PropTypes.func.isRequired,
        status: PropTypes.bool.isRequired,
        onSubmitChanges: PropTypes.func.isRequired,
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
    };

    /**
     * Handle input change
     * @param event
     */
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    };

    /**
     * On Submit
     */
    onSubmit = (e) => {

        e.preventDefault();

        const {config, onSubmitChanges, status} = this.props;
        const wifiConfig = config.wifi;
        const LTEConfig = config.lte;

        let dhcpSettigns = null;

        if (!status) {

            dhcpSettigns = {
                lan_dns1: this.state.primaryDNS,
                lan_dns2: this.state.secondaryDNS,
                lan_gw: this.state.defaultGateway,
                lan_ip: this.state.lanIpAddress,
                lan_netmask: this.state.netmask,
            };

        }

        /**
         * Data
         * @type {{wifi_ssid: string, lte_apn: string, lte_number: *, wifi_dhcp: boolean, wifi_key: string, lan_dhcp: boolean}}
         */
        const data = {

            lte_apn: LTEConfig.apn,
            lte_number: LTEConfig.number,
            wifi_dhcp: true,
            wifi_key: wifiConfig.key,
            wifi_ssid: wifiConfig.ssid,
            lan_dhcp: false,
            ...dhcpSettigns
        };

        // Submit changes to backend
        onSubmitChanges(data);
    };

    /**
     * Final Render
     * @returns {*}
     */
    render() {

        const {status, t} = this.props;

        return <div className="dhcp-panel switch-panel">
            <div className={"switch-panel__headline"}>
                <Row start="xs">
                    <Col xs>
                        LAN DHCP
                    </Col>
                    <Col xs className={"switch-panel__right"}>
                        <SwitchButton checked={status} onClick={this.props.onSwitch}/>
                    </Col>
                </Row>
            </div>

            {!status ?
                <form onSubmit={this.onSubmit} className={"form"}>
                    <div className={"switch-panel__inner-box"}>
                        <Row>
                            <Col xs className=" text--left">
                                <FormGroup>
                                    <label htmlFor="lanIpAddress">LAN IP address</label>
                                    <input onChange={this.handleInputChange}
                                           value={this.state.lanIpAddress}
                                           type="text"
                                           name="lanIpAddress"
                                           id="lanIpAddress"
                                           placeholder={""}
                                           required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="netmask">Netmask</label>
                                    <input onChange={this.handleInputChange}
                                           value={this.state.netmask}
                                           type="text"
                                           name="netmask"
                                           id="netmask"
                                           required
                                           placeholder={""}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="defaultGateway">Default gateway</label>
                                    <input onChange={this.handleInputChange}
                                           value={this.state.defaultGateway}
                                           type="text"
                                           name="defaultGateway"
                                           id="defaultGateway"
                                           required
                                           placeholder={""}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="primaryDNS">Primary DNS</label>
                                    <input onChange={this.handleInputChange}
                                           value={this.state.primaryDNS}
                                           type="text"
                                           name="primaryDNS"
                                           id="primaryDNS"
                                           required
                                           placeholder={""}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="secondaryDNS">Secondary DNS</label>
                                    <input onChange={this.handleInputChange}
                                           value={this.state.secondaryDNS}
                                           type="text"
                                           name="secondaryDNS"
                                           id="secondaryDNS"
                                           required
                                           placeholder={""}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <div className={"text--center"}>
                                        <button className={"btn"}>{t("button.UpdateDHCP")}</button>
                                    </div>
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>
                </form> : ""
            }
        </div>;
    }
}

export default translate()(DHCPPanel);