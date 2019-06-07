// @flow

// Necessary Evil
import React from "react";
import InstantAction from "../Models/Utils/InstantAction";
import LoadingComponent from "../Components/LoadingComponent";
import PropTypes from "prop-types";
import {withRouter} from "react-router";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * @class AppContainer
 */
class AppContainer extends React.Component {

    /**
     * PropTypes
     * @type {{children: any}}
     */
    static propTypes = {
        children: PropTypes.any,
    };

    /**
     * State
     * @type {{loadingData: boolean}}
     */
    state = {
        loadingData: false,
    };

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);

        InstantAction.initiateHistory(this.props.history);

        this.state.loadingData = false;

    }

    /**
     * Final Render
     * @returns {*}
     */
    render() {

        if (this.state.loadingData) {
            return <LoadingComponent/>;
        } else {
            return <div className={"app-wrapper"}>
                <ToastContainer
                    position="top-left"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={true}
                    closeOnClick
                    pauseOnVisibilityChange
                    rtl
                    draggable
                    pauseOnHover
                    toastClassName="aurora-toast"
                />
                <div className={"app-theme"}>
                    {this.props.children}
                </div>
            </div>;
        }
    }
}

/**
 * Exporting part of the React.Component file
 */
export default withRouter(AppContainer);