/**
 * React 진입점
 * @file src/index.ts
 * @author Ju Seongjin
 * @version 1.0
 * @see none
 * @history
 * - 2022-07-26, 최초 작성
 */
import React from "react";

import { ConnectedRouter } from "connected-react-router";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import App from "./app";
import * as serviceWorker from "./service-worker";
import { store, persistor } from "./services/store/index";
import { history } from "./services/store/index";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={history}>
                <BrowserRouter basename={process.env.REACT_APP_URL}>
                    <React.StrictMode>
                        <App />
                    </React.StrictMode>
                </BrowserRouter>
            </ConnectedRouter>
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);

serviceWorker.unregister();
