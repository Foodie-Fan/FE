import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../../store/users/authActions";
import {Form, Field, withFormik} from "formik";
import * as Yup from "yup";
import useStyles from './styleForm'
import Lock from '@material-ui/icons/Lock'
import Identity from '@material-ui/icons/PermIdentity'
import Typography from "@material-ui/core/Typography";

const Login = ({errors, touched, ...props}) => {
    const classes = useStyles();
    return (
        <div className={classes.formBorder}>
            <Typography className={classes.title} variant="h5">LOGIN</Typography>
            <Form className={classes.formContainer}>
                <div className={classes.iconArea}>
                    <div className={classes.icon}>
                        <Identity/>
                    </div>
                    <Field type="text" name="username" placeholder="Username" className={classes.field}/>
                </div>

                {touched.username && errors.username && (
                    <p className={classes.error}>{errors.username}</p>
                )}
                <div className={classes.iconArea}>
                    <div className={classes.icon}>
                        <Lock/>
                    </div>
                    <Field type="password" name="password" placeholder="Password" className={classes.field}/>
                </div>
                {touched.password && errors.password && (
                    <p className={classes.error}>{errors.password}</p>
                )}

                <button type="submit" className={classes.submitBtn}>{props.isLoading ? "..." : "Login "}</button>

            </Form>
            <div className={classes.note}>
                <p>Don't have an account yet? <Link to="/signup"> Sign Up</Link> here.</p>
            </div>
        </div>
    );
};

const FormikLoginForm = withFormik({
    mapPropsToValues({username, password}) {
        return {
            username: username || "",
            password: password || "",
        };
    },

    validationSchema: Yup.object().shape({
        username: Yup.string().required("Please enter your username."),
        password: Yup.string().required("Please enter your password."),
    }),

    handleSubmit(values, {resetForm, props}) {
        props.login(values, props.history);
        resetForm();
    },
})(Login);

const mapStateToProps = state => {
    return {
        isLoading: state.users.isLoading,
        error: state.users.error,
    }
};

export default connect(
    mapStateToProps,
    {login},
)(FormikLoginForm);
