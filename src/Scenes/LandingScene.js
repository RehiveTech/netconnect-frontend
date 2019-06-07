// @flow
import React from "react";
import {PrivateSceneWrapper} from "../Components/Wrappers";
import {translate} from "react-i18next";
import {withRouter} from "react-router-dom";
import BackendRequest from "../Models/REST";
import NetConnectPanel from "../Components/NetConnectPanel/NetConnectPanel";

/**
 * @class LandingScene
 */
class LandingScene extends React.Component {

    /**
     * State
     * @type {{status: {wifi_client, lan, counter, lte, ncstatus}}}
     */
    state = {
        status: null,
        config: null,
        refresh: null,
    };

    /**
     * Load status
     */
    loadStatus() {

        BackendRequest({
            endpoint: "config",
            self: this,
            onSuccess: (response) => {

                this.setState({
                    config: response.data,
                });

                this.refreshStatus();
            }
        });
    }

    /**
     * Refresh Status
     */
    refreshStatus = () => {

        BackendRequest({
            method: "get",
            endpoint: "status",
            self: this,
            onSuccess: (response) => {
                this.setState({
                    status: response.data
                });
            },
        });

    };

    /**
     * Component did mount
     */
    componentDidMount(): void {

        this.loadStatus();

        let self = this;

        let refresh = setInterval(function () {
            self.refreshStatus();
        }, 1000);

        this.setState({
            refresh: refresh
        });

    };

    /**
     * Component Will Unmount
     */
    componentWillUnmount(): void {

        clearInterval(this.state.refresh);

    }

    /**
     * Final Render
     * @returns {*}
     */
    render() {

        if (this.state.status === null) {
            return <div style={{padding: "2rem"}}>Web server is not available</div>;
        }

        return (
            <PrivateSceneWrapper>
                <NetConnectPanel status={this.state.status} config={this.state.config}/>
            </PrivateSceneWrapper>
        );
    }

}


/**
 * Exporting part of the React.Component file
 */
export default withRouter(translate()(LandingScene));