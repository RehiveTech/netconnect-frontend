// @flow

import React from "react";
import { I18nextProvider } from "react-i18next"; // as we build ourself via webpack
import {Provider as ReduxProvider} from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";
import i18n from "../Config/I18next";
import AppContainer from "./AppContainer";
import routes from "../Config/routes";
import {store} from "../Config/store";

// CSS
import "./App.css";

/**
 * @class App
 *
 */
export default class App extends React.Component {

	/**
	 * Final Render
	 * @returns {*}
	 */
	render () {
		return <ReduxProvider store={store}>
			<I18nextProvider i18n={i18n}>
				<BrowserRouter>
					<AppContainer className="app-wrapper">
						<Switch>
							{routes}
						</Switch>
					</AppContainer>
				</BrowserRouter>
			</I18nextProvider>
		</ReduxProvider>;

	}
}