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

}


export default InstantAction = withRouter(InstantAction);