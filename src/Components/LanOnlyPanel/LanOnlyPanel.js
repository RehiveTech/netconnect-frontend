// @flow

// Necessary Evil
import React from "react";
import PropTypes from "prop-types";
import {translate} from "react-i18next";
import {Col, Row} from "react-flexbox-grid";
// Import component CSS
import "./LanOnlyPanel.css";
import SwitchButton from "../SwitchButton/SwitchButton";
import { connect } from "react-redux";
import InstantAction from "../../Models/Utils/InstantAction";
import { setConfiguration } from "../../App/App.actions";


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

        const {onSwitch, app} = this.props;

        /**
         * Data
         * @type {{wifi_ssid: string, lte_apn: string, lte_number: *, wifi_dhcp: boolean, wifi_key: string, lan_dhcp: boolean}}
         */
        const data = {
			...app.config,
            connection_type: "lan"
        };

        // Switch LAN local state
        onSwitch("lan");
        InstantAction.dispatch(setConfiguration(data));

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

/**
 * Map State To Props
 * @param state
 * @return {{app: (*|appReducer)}}
 */
const mapStateToProps = state => (
	{
		app: state.app,
	});


export default connect(mapStateToProps)(translate()(LanOnlyPanel));