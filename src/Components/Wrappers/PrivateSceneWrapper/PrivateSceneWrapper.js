// @flow

// Necessary Evil
import React from "react";
import PropTypes from "prop-types";
import {Col, Grid, Row} from "react-flexbox-grid";

import "./PrivateSceneWrapper.css";
import Footer from "../../Footer/Footer";

/**
 * @class PrivateSceneWrapper
 */
export default class PrivateSceneWrapper extends React.Component {

    /**
     * PropTypes
     * @type {{children: shim}}
     */
    static propTypes = {
        children: PropTypes.any,
    };

    /**
     * Final Render
     * @returns {*}
     */
    render() {

        return <div className="private-scene-wrapper">
            <div className="private-scene-wrapper__background"/>
            <Grid className="private-scene-wrapper__content">
                <Row center="xs">
                    <Col xs={12} lg={4}>
                        {this.props.children}
                    </Col>
                </Row>
            </Grid>
            <Footer/>
        </div>;
    }
}