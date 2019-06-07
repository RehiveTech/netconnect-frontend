// @flow

// Necessary Evil
import React from "react";
import PropTypes from "prop-types";
import {translate} from "react-i18next";
import LoadingComponent from "../Components/LoadingComponent";
import FormMethod from "./FormMethods";
import FormGroup from "../Components/Form/FormGroup";


/**
 * @class WifiForm
 *
 */
class WifiForm extends React.Component {

    /**
     * PropTypes
     * @type {{children: shim, videoCategories: *}}
     */
    static propTypes = {
        config: PropTypes.object,
        onSubmit: PropTypes.func.isRequired,
    };

    /**
     * State
     * @type {{formData: {}, expectingResponse: boolean, errorMessage: null}}
     */
    state = {
        expectingResponse: false,
        errorMessage: null,
        key: "",
        ssid: "",
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
     * Component will mount
     */
    componentWillMount() {
        this.setState({
            ...this.props.config.wifi,
        });
    }

    /**
     *
     * @param nextProps
     * @param nextContext
     */
    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {

        console.log(nextProps.config.wifi.ssid);


        if(this.props.config.wifi.ssid !== nextProps.config.wifi.ssid){

            this.setState({
                ssid: nextProps.config.wifi.ssid
            });
        }


    }

    /**
     * On Switch
     */
    onSubmit = (e) => {

        e.preventDefault();

        const {config, onSubmit} = this.props;

        const LTEConfig = config.lte;

        /**
         * Data
         * @type {{wifi_ssid: string, lte_apn: string, lte_number: *, wifi_dhcp: boolean, wifi_key: string, lan_dhcp: boolean}}
         */
        const data = {

            lan_dhcp: true,
            lte_apn: LTEConfig.apn,
            lte_number: LTEConfig.number,
            wifi_dhcp: true,
            wifi_key: this.state.key,
            wifi_ssid: this.state.ssid,
            connection_type: "wifi",
        };

        // Submit changes to backend
        onSubmit(data);
    };

    /**
     * Final Render
     * @returns {*}
     */
    render() {

        console.log(this.state);

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
                <label htmlFor="">{"SSID network name"}</label>
                <input onChange={this.handleInputChange}
                       value={this.state.ssid}
                       type="text"
                       tabIndex={1}
                       name="ssid"
                       id="ssid"
                       autoFocus={true}
                       placeholder={""}/>
            </FormGroup>
            <FormGroup>
                <label htmlFor="key">Key</label>
                <input onChange={this.handleInputChange}
                       value={this.state.key}
                       type="text"
                       tabIndex={2}
                       name="key"
                       id="key"
                       placeholder={""}/>
            </FormGroup>
            <div className="form--group text--center">
                {(this.state.expectingResponse) ? <LoadingComponent/> :
                    <button type="submit" tabIndex={2}
                            className="btn btn--animated">{t("button.SaveConfiguration")}</button>}
            </div>
        </form>;
    }
}

export default translate()(WifiForm);