import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import reducers from './store/index';

//theme
import CssBaseline from '@material-ui/core/CssBaseline';
import {createMuiTheme, responsiveFontSizes, MuiThemeProvider} from '@material-ui/core/styles';

const store = createStore(reducers, applyMiddleware(thunk));

let theme = createMuiTheme({
    palette: {
        primary: {
            main: "#D80000",
            light: "#ff0000",
            dark: "#ab0000",
            contrastText: "white",
        },
        secondary: {
            main: "#767676",
            light: "#c3c3c3",
            dark: "#4f4f4f",
            contrastText: "white",
        },
    },
});

theme = responsiveFontSizes(theme);

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <CssBaseline/>
            <App/>
        </MuiThemeProvider>
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();
