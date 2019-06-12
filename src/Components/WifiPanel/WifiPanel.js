// @flow

// Necessary Evil
import React from "react";
import PropTypes from "prop-types";
import {translate} from "react-i18next";
import {Col, Row} from "react-flexbox-grid";
// Import component CSS
import "./WifiPanel.css";
import SwitchButton from "../SwitchButton/SwitchButton";
import WifiForm from "../../Forms/WifiForm";
import BackendRequest from "../../Models/REST";
import InstantAction from "../../Models/Utils/InstantAction";
import { setConfiguration } from "../../App/App.actions";
import { connect } from "react-redux";


/**
 * @class WifiPanel
 */
class WifiPanel extends React.Component {

    /**
     * PropTypes
     * @type {{children: shim}}
     */
    static propTypes = {
        children: PropTypes.any,
        service: PropTypes.string,
        config: PropTypes.object.isRequired,
        onSubmitChanges: PropTypes.func.isRequired,
    };

    /**
     *
     * @type {{networks: Array}}
     */
    state = {
        networks: []
    };

    /**
     * On network item click
     * @param networkSSID
     */
    onSelectNetwork = (networkSSID) => {

    	const {app} = this.props;

		// Save change to store
		const data = {
			...app.config,
			wifi_ssid: networkSSID,
		};

		InstantAction.dispatch(setConfiguration(data));

    };

    /**
     * On Scan
     */
    onScan = () => {

        BackendRequest({
            endpoint: "wifi-scan",
            onSuccess: (response) => {
                this.setState({
                    networks: response.data,
                });
            }
        });

    };

    componentDidMount(): void {

        this.setState({
            config: this.props.config
        });
    }

    /**
     * Final Render
     * @returns {*}
     */
    render() {

        const {t, service} = this.props;



        return <div className="lte-panel switch-panel">
            <div className={"switch-panel__headline"}>
                <Row start="xs">
                    <Col xs>
                        Wi-Fi
                    </Col>
                    <Col xs className={"switch-panel__right"}>
                        <SwitchButton checked={service === "wifi_client" || service === "wifi"}
                                      onClick={() => this.props.onSwitch("wifi_client")}/>
                    </Col>
                </Row>
            </div>
            {service === "wifi_client" || service === "wifi" ?
                <div className={"switch-panel__inner-box"}>
                    <Row>
                        <Col xs>
                            <WifiForm config={this.state.config} onSubmit={this.props.onSubmitChanges}/>
                        </Col>
                    </Row>
                    <br/>
                    <Row start={"xs"}>
                        <Col xs>
                            <button className={"btn"} onClick={this.onScan}><i
                                className="icon-wifi"/>&nbsp;{t("button.SelectNetwork")}
                            </button>

                            {this.state.networks.length > 0 ? <div>

                                {this.state.networks.map(network => {
                                    return <div className={"network-item"}
                                                onClick={() => this.onSelectNetwork(network.ssid)}><i className="icon-wifi" /> {network.ssid}</div>;
                                })}

                            </div> : ""}
                        </Col>
                    </Row>
                </div> : ""
            }
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


export default connect(mapStateToProps)(translate()(WifiPanel));