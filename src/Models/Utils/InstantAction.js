// @flow
import {withRouter} from "react-router";

/**
 * Instant Action
 */
class InstantAction {


    /**
     * Init
     * @param history
     */
    static initiateHistory(history) {
        InstantAction.history = history;
    }


    /**
     * Redirect
     * @param path
     */
    static redirect(path) {
        InstantAction.history.push(path);
    }

	/**
	 * Pure Dispatcher
	 * @param data
	 */
	static dispatch(data) {
		InstantAction.dispatcher(data);
	}

	/**
	 * Initiate Dispatcher
	 * @param dispatcher {func}
	 */
	static initiateDispatcher(dispatcher) {
		InstantAction.dispatcher = dispatcher;
	}

}


export default InstantAction = withRouter(InstantAction);