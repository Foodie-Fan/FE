import React from "react";
import {
    Switch,
    BrowserRouter as Router,
    Route,
    Redirect,
} from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import './App.css';

//Components
import NavBar from "./components/navbar/NavBar";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUpForm";
import Dashboard from "./components/dashboard/Dashboard";

//Material-ui
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    container: {
        marginTop: '64px',
        maxWidth: '1200px',
        minWidth: "400px",
        width: '100%',
        margin: 'auto',
        paddingBottom: 100,
    },
});


const App = () => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.container}>
                <Router>
                    <NavBar/>
                    <Switch>
                        {/* {public routes} */}
                        <Route path="/login" component={Login}/>
                        <Route path="/signup" component={SignUp}/>

                        {/* {private routes} */}
                        <PrivateRoute path="/dashboard" component={Dashboard}/>

                        {/* {default} */}
                        <Redirect from="/" to="/dashboard"/>
                    </Switch>
                </Router>
            </div>
        </>
    );
};

export default App;

