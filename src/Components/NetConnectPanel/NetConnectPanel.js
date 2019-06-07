// @flow

// Necessary Evil
import React from "react";
import PropTypes from "prop-types";
import {translate} from "react-i18next";
import RenewButton from "../RenewButton/RenewButton";
import InfoPanel from "../InfoPanel/InfoPanel";
import LanOnlyPanel from "../LanOnlyPanel/LanOnlyPanel";
import LTEPanel from "../LTEPanel/LTEPanel";
import WifiPanel from "../WifiPanel/WifiPanel";
import {SettingsForm} from "../../Forms";
// Import component CSS
import "./NetConnectPanel.css";
import "./SwitchPanel.css";
import BackendRequest from "../../Models/REST";
import DHCPPanel from "../DHCPPanel/DHCPPanel";
import InstantAction from "../../System/InstantAction";

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
        this.setState({
            service: service,
        });
    };


    componentDidMount() {
        this.setState({
            service: this.props.config.connection_type
        });
    }

    /**
     * On submit configuration to backend
     * @param configData
     */
    onSubmitChanges = (configData: Object) => {

        /**
         * Prepared payload structure
         * @type {{restart: string, config: {connection_type: string}}}
         */
        const payload = {
            config: {
                connection_type: this.state.service,
                lan_dhcp: this.state.dhcpStatus,
                ...configData,
            },
            restart: "application",
        };

        BackendRequest({
            method: "post",
            endpoint: "config",
            payload: payload,
        });

        InstantAction.setToast("Configuration Saved");
    };

    /**
     * Refresh AP +60 seconds
     */
    onRefreshAP = () => {
        BackendRequest({
            method: "get",
            endpoint: "refresh",
        });
    };


    onChangeDHCP = () => {

        this.setState({
            dhcpStatus: !this.state.dhcpStatus
        });

    };


    /**
     * Final Render
     * @returns {*}
     */
    render() {
        const {status, config} = this.props;

        return <div className="net-connect-panel">

            <RenewButton counter={status.counter} onClick={this.onRefreshAP}/>
            <InfoPanel status={status} service={this.state.service} config={this.props.config}/>
            <LanOnlyPanel
                service={this.state.service}
                onSwitch={this.switchService}
                config={config}
                onSubmitChanges={this.onSubmitChanges}
            />
            <LTEPanel
                config={config}
                service={this.state.service}
                onSwitch={this.switchService}
                status={status}
                onSubmitChanges={this.onSubmitChanges}
            />
            <WifiPanel
                config={config}
                service={this.state.service}
                onSwitch={this.switchService}
                status={status}
                onSubmitChanges={this.onSubmitChanges}
            />
            <br/>

            <DHCPPanel
                status={this.state.dhcpStatus}
                config={this.props.config}
                onSwitch={this.onChangeDHCP}
                onSubmitChanges={this.onSubmitChanges}
            />

            <div className="settings-form">
                <SettingsForm config={config} onSubmitChanges={this.onSubmitChanges}/>
            </div>
        </div>;
    }
}

export default translate()(NetConnectPanel);