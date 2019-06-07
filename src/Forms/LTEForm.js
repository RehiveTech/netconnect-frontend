// @flow

// Necessary Evil
import React from "react";
import PropTypes from "prop-types";
import {translate} from "react-i18next";
import LoadingComponent from "../Components/LoadingComponent";
import FormMethod from "./FormMethods";
import FormGroup from "../Components/Form/FormGroup";

/**
 * @class LTEForm
 *
 */
class LTEForm extends React.Component {

    /**
     * PropTypes
     * @type {{children: shim, videoCategories: *}}
     */
    static propTypes = {
        children: PropTypes.any,
        config: PropTypes.object,
        onSubmit: PropTypes.func.isRequired,
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
        apn: "",
        number: "",
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

        const {config, onSubmit} = this.props;

        const wifiConfig = config.wifi;
        const lanConfig = config.lan;


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
            lan_dhcp: lanConfig.ipv4.dhcp,
            lte_apn: this.state.apn,
            lte_number: this.state.number,
            wifi_dhcp: wifiConfig.ipv4.dhcp,
            wifi_key: wifiConfig.key,
            wifi_ssid: wifiConfig.ssid,
        };

        // Submit changes to backend
        onSubmit(data);
    };


    /**
     * Component will mount
     */
    componentWillMount() {

        this.setState({
            ...this.props.config.lte,
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

        /**
         * Final Output
         * @type {{}}
         */
        return <form onSubmit={this.onSubmit} className={"form text--left"}>
            {error}
            <FormGroup>
                <label htmlFor="">APN</label>
                <input onChange={this.handleInputChange} value={this.state.apn} type="text" tabIndex={1}
                       name="apn" id="apn"
                       autoFocus={true} placeholder={""}/>
            </FormGroup>
            <FormGroup>
                <label htmlFor="">Number</label>
                <input onChange={this.handleInputChange} value={this.state.number} type="text" tabIndex={2}
                       name="number" id="number"
                       placeholder={"Enter number"}/>
            </FormGroup>
            <div className="form--group text--center">
                {(this.state.expectingResponse) ? <LoadingComponent/> :
                    <button type="submit" tabIndex={2}
                            className="btn btn--animated">{t("button.SaveConfiguration")}</button>}
            </div>
        </form>;
    }
}

export default translate()(LTEForm);