// @flow

// Necessary Evil
import React from "react";
import InstantAction from "../Models/Utils/InstantAction";
import LoadingComponent from "../Components/LoadingComponent";
import { connect } from "react-redux";
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
		InstantAction.initiateDispatcher(this.props.dispatch);


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
 * This function maps the state to a
 * prop called `state`.
 *
 * In larger apps it is often good
 * to be more selective and only
 * map the part of the state tree
 * that is necessary.
 */
const mapStateToProps = state => (
	{
		app: state.app,
	});


/**
 * Exporting part of the React.Component file
 */
export default connect(mapStateToProps)(withRouter(AppContainer));
