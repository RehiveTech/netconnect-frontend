import React from "react";
import {Route} from "react-router-dom";
import LandingScene from "../Scenes/LandingScene";

/**
 * Export of routes
 * @type {*[]}
 */
const routes = [
    // Defaults
    <Route key={""} exact path="/:page?/:secondary?/:entity?/:id?" component={LandingScene}/>,
];

export default routes;