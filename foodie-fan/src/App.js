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
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  container: {
    marginTop: '64px',
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#D80000",
      light: "#ff0000",
      dark: "#ab0000",
      contrastText: "white",
    },
    secondary: {
      main: "#C6C6C6",
      light: "#EDEDED",
      dark: "#7C7C7C",
      contrastText: "white",
    },
  },
});

const App = () => {
  const classes = useStyles();
  return (
      <>
        <MuiThemeProvider theme={theme}>
          <Container className={classes.container}>
          <Router>
            <NavBar/>
            <Switch>
              {/* {public routes} */}
              <Route path="/login" component={Login}/>
              <Route path="/signup" component={SignUp}/>

              {/* {private routes} */}
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>

              {/* {default} */}
              <Redirect from="/" to="/dashboard"/>
            </Switch>
          </Router>
          </Container>
        </MuiThemeProvider>
      </>
  );
};

export default App;

