import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"
import APIWrapper from "./API/api_wrapper";
import App from "./App";
import CookiesWrapper from "./API/cookies";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import reducers from "./redux/reducers/store";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

console.log("Running React: " + React.version)
const store = reducers;
const cookieWrapper = new CookiesWrapper();
const retrievedLoginInfo = cookieWrapper.retrieveCookieIfExists(
    "user_information"
);
if (retrievedLoginInfo !== null) {
    store.dispatch({
        type: "CHANGE_LOGIN_INFO",
        loginInfo: JSON.parse(retrievedLoginInfo)
    });
}
const apiWrapper = new APIWrapper(store);

document.title = "Meal Credit App";

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <App
                cookieWrapper={cookieWrapper}
                apiWrapper={apiWrapper}
            />
        </ThemeProvider>
    </Provider>,
    document.getElementById("root")
);

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
