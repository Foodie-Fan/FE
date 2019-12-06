import React from "react";
import {Link as RouterLink} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar/index";
import Toolbar from "@material-ui/core/Toolbar/index";
import Button from "@material-ui/core/Button/index";
import makeStyles from "@material-ui/core/styles/makeStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";
import {logout} from "../../store/users/authActions";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        height: 20,
    },
    navBar: {
        background: "white",
        color: "black",
        boxShadow: "none",
        borderBottom: "1px solid #dbdbdb",
    },
    title: {
        flexGrow: 1,
        paddingLeft: "1rem",
        color: "#D80000",
        fontFamily: "Nunito",
    },
    logoLink: {
        color: "#D80000",
        textDecoration: 'none',
        whiteSpace: "nowrap",
        "&:hover": {
            color: "#8a0000",
        },
    },
}));

const LinkButton = withStyles(theme => ({
    root: {
        color: "black",
        "&:hover": {
            color: "black",
        },
    },
}))(Button);

const NavBar = props => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar className={classes.navBar}>
                <Toolbar>
                    <Typography variant="h4" className={classes.title}>
                        <a href="https://build-week-foodie-fun.github.io/UI/"
                           className={classes.logoLink}>
                            Foodie Fun
                        </a>
                    </Typography>
                    {!props.isAuth && (<LinkButton component={RouterLink} to="/login">Login</LinkButton>)}
                    {!props.isAuth && (<LinkButton component={RouterLink} to="/signup">Sign up</LinkButton>)}
                    {props.isAuth && (<LinkButton component={RouterLink} to="/dashboard">Dashboard</LinkButton>)}
                    {props.isAuth && (
                        <LinkButton component={RouterLink} onClick={() => props.logout()}>Logout</LinkButton>)}
                </Toolbar>
            </AppBar>
        </div>
    );
};

const mapPropsToState = state => {
    return {
        isAuth: state.users.isAuth,
    };
};
export default connect(
    mapPropsToState,
    {logout},
)(NavBar);
