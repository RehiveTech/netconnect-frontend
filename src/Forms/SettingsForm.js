// @flow

// Necessary Evil
import React from "react";
import PropTypes from "prop-types";
import {translate} from "react-i18next";
import LoadingComponent from "../Components/LoadingComponent";
import FormMethod from "./FormMethods";
import FormGroup from "../Components/Form/FormGroup";

/**
 * @class SettingsForm
 *
 */
class SettingsForm extends React.Component {

    /**
     * PropTypes
     * @type {{children: shim, videoCategories: *}}
     */
    static propTypes = {
        children: PropTypes.any,
        config: PropTypes.any,
    };

    /**
     * Default props
     * @type {{formData: {}}}
     */
    static defaultProps = {};

    /**
     * State
     * @type {{formData: {}, expectingResponse: boolean, errorMessage: null}}
     */
    state = {
        expectingResponse: false,
        errorMessage: null,
        timeout: 60,
        password: "",
    };

    /**
     * constructor
     * @param props
     */
    constructor(props) {
        super(props);

        FormMethod.self = this;
        this.handleInputChange = FormMethod.handleInputChange.bind(this);
    }

    /**
     * On Switch
     */
    onSubmit = (e) => {

        e.preventDefault();

        const {config, onSubmitChanges} = this.props;

        let apKey = (this.state.password === "") ? null : this.state.password;

        /**
         *
         * @type {{
         *  wifi_ssid: string,
         *  lte_apn: string,
         *  lte_number: string,
         *  wifi_dhcp: boolean,
         *  wifi_key: string,
         *  lan_dhcp: boolean
         * }}
         */
        const data = {
            lan_dhcp: true,
            lte_apn: config.lte.apn,
            lte_number: config.lte.number,
            wifi_dhcp: true,
            wifi_key: config.wifi.key,
            wifi_ssid: config.wifi.ssid,
            ap_key: apKey,
            ap_timeout: this.state.timeout,
        };

        // Submit changes to backend
        onSubmitChanges(data);
    };


    /**
     * Component will mount
     */
    componentWillMount() {

        const {config} = this.props;

        this.setState({
            timeout: parseInt(config.ap_timeout, 10),
            password: config.ap_key,
        });
    }

    /**
     * Final Render
     * @returns {*}
     */
    render() {

        /**
         * @info Translation function, className
         */
        const {t} = this.props;
        /**
         * @info Error variable
         */
        let error = "";

        /**
         * @info Handling Error Message
         */
        if (this.state.errorMessage !== null) {
            error = <div style={{color: "orange", fontWeight: 700}}><i
                className="icon-cube"/> {t("formError." + this.state.errorMessage)}</div>;
        }

        let passwordNull = this.state.password === null ? "" : this.state.password;

        /**
         * Final Output
         * @type {{}}
         */
        return <form onSubmit={this.onSubmit} className={"form text--left"}>
            <h3>Wi-Fi Access Point (AP) Settings</h3>
            {error}
          <FormGroup>
            <label htmlFor="ssid">SSID network name</label>
            <input onChange={this.handleInputChange} value={"aurora-netconnect"} type="text" disabled={true}
                   name="ssid" id="ssid"/>
          </FormGroup>
            <FormGroup>
                <label htmlFor="timeout">AP visibility timeout [s]</label>
                <input onChange={this.handleInputChange} value={this.state.timeout} type="number" tabIndex={1}
                       name="timeout" id="timeout"
                       autoFocus={true} placeholder={""}/>
            </FormGroup>
            <FormGroup>
                <label htmlFor="password">Password (min. 8 characters)</label>
                <input onChange={this.handleInputChange} value={passwordNull} type="password" tabIndex={2}
                       minLength={8}
                       name="password"
                       id="password"
                       placeholder="Enter password or leave blank"/>
            </FormGroup>
            <div className="form--group text--center">
                {(this.state.expectingResponse) ? <LoadingComponent/> :
                    <button type="submit" tabIndex={3}
                            onSubmit={this.onSubmit}
                            className="btn btn--animated">{t("button.SaveSettings")}</button>}
            </div>
        </form>;
    }
}

export default translate()(SettingsForm);