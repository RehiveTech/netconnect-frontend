// @flow

// Necessary Evil
import React from "react";
import PropTypes from "prop-types";
import {translate} from "react-i18next";
import {Col, Row} from "react-flexbox-grid";
// Import component CSS
import "./LTEPanel.css";
import SwitchButton from "../SwitchButton/SwitchButton";
import LTEForm from "../../Forms/LTEForm";


/**
 * @class LTEPanel
 */
class LTEPanel extends React.Component {

    /**
     * PropTypes
     * @type {{children: shim}}
     */
    static propTypes = {
        children: PropTypes.any,
        service: PropTypes.string,

    };

    /**
     * Final Render
     * @returns {*}
     */
    render() {

        const {service, config} = this.props;

        return <div className="lte-panel switch-panel">
            <div className={"switch-panel__headline"}>
                <Row start="xs">
                    <Col xs>
                        LTE
                    </Col>
                    <Col xs className={"switch-panel__right"}>
                        <SwitchButton checked={service === "lte"} onClick={ ()=> this.props.onSwitch("lte") }/>
                    </Col>
                </Row>
            </div>

            {service === "lte" ?
                <div className={"switch-panel__inner-box"}>
                    <Row>
                        <Col xs>
                            <LTEForm config={config} onSubmit={this.props.onSubmitChanges}/>
                        </Col>
                    </Row>
                </div> : ""
            }
        </div>;
    }
}

export default translate()(LTEPanel);