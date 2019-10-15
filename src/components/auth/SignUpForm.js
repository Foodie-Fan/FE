import React, {useEffect} from "react";
import {Form, Field, withFormik} from "formik";
import * as Yup from "yup";
import {connect} from "react-redux";
import {register, clearError} from "../../store/users/authActions";
import {Link} from "react-router-dom";
import useStyles from './styleForm'
import Lock from '@material-ui/icons/Lock'
import Identity from '@material-ui/icons/PermIdentity'
import Typography from '@material-ui/core/Typography';
import ImgDropAndCrop from "../dropzone/imgDropAndCrop";
import Toast from "../toasts/Toast";
import warning from "react-redux/es/utils/warning";
import Collapse from "@material-ui/core/Collapse";

const SignUpForm = ({errors, touched, ...props}) => {
    const classes = useStyles();

    useEffect(() => {
        props.clearError();
    }, []);

    return (
        <div className={classes.formBorder}>
            {props.error && props.error.length > 0 && <Toast variant={"warning"} message={props.error} state={true}/>}

            <Typography className={classes.title} variant="h5">SIGN UP</Typography>
            <Form className={classes.formContainer}>
                <label className={classes.labelContainer}>
                    <p className={classes.label}>Name:</p>
                    <div className={classes.iconArea}>
                        <div className={classes.icon}>
                            <Identity/>
                        </div>
                        <Field type="text" name="name" placeholder="Name" className={classes.field}/>
                    </div>
                </label>
                <Collapse in={touched.name && errors.name}>
                    <p className={classes.error}>{errors.name}</p>
                </Collapse>

                <label className={classes.labelContainer}>
                    <p className={classes.label}>Username:</p>
                    <div className={classes.iconArea}>
                        <div className={classes.icon}>
                            <Identity/>
                        </div>
                        <Field type="text" name="username" placeholder="Username" className={classes.field}/>
                    </div>
                </label>

                <Collapse in={touched.username && errors.username}>
                    <p className={classes.error}>{errors.username}</p>
                </Collapse>

                <label className={classes.labelContainer}>
                    <p className={classes.label}>Password:</p>
                    <div className={classes.iconArea}>
                        <div className={classes.icon}>
                            <Lock/>
                        </div>
                        <Field type="password" name="password" placeholder="Password" className={classes.field}/>
                    </div>
                </label>

                <Collapse in={touched.password && errors.password}>
                    <p className={classes.error}>{errors.password}</p>
                </Collapse>

                <label className={classes.labelContainer}>
                    <p className={classes.label}>Password:</p>
                    <div className={classes.iconArea}>
                        <div className={classes.icon}>
                            <Lock/>
                        </div>
                        <Field
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className={classes.field}
                        />
                    </div>
                </label>
                <Collapse in={touched.confirmPassword && errors.confirmPassword}>
                    <p className={classes.error}>{errors.confirmPassword}</p>
                </Collapse>

                <ImgDropAndCrop/>
                <button className={classes.submitBtn} type="submit">{props.isLoading ? "..." : "Submit "}</button>
            </Form>
            <div className={classes.note}>
                <p className={classes.noteText}>Don't have an account yet?<Link to="/login"> Login</Link> here.</p>
            </div>
        </div>
    );
};

const FormikSignUpForm = withFormik({
    mapPropsToValues({name, username, password, confirmPassword}) {
        return {
            name: name || "",
            username: username || "",
            password: password || "",
            confirmPassword: confirmPassword || "",
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Please enter your name"),
        username: Yup.string().required("Please enter your username."),
        password: Yup.string()
            .min(6)
            .required("Please enter at least 6 letters"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Password confirm is required"),
    }),

    handleSubmit(values, {props}) {
        const fd = new FormData();
        fd.append('name', values.name);
        fd.append('username', values.username);
        fd.append('password', values.password);
        fd.append('avatar', props.file);
        props.register(fd, props.history);
    },
})(SignUpForm);

const mapPropsToState = state => {
    return {
        isLoading: state.users.isLoading,
        error: state.users.error,
        file: state.users.file,
    }
};

export default connect(
    mapPropsToState,
    {register, clearError},
)(FormikSignUpForm);
