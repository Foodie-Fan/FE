import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {getUsers} from "../../store/users/authActions";
import ProfileCard from "./Profile";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        background: 'white',
        marginTop: 20,
        borderRadius: 4,
        border: '0.8px solid #e8e8e8',
        padding: 20,
    },
    card: {
        margin: 0
    },
});

function Users(props) {
    const classes = useStyles()

    useEffect(() => {
        props.getUsers()
    }, []);

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                {props.users && props.users.map((item, index) =>
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Link to={`/dashboard/profile/${item.id}`}>
                            <ProfileCard username={item.username}
                                         name={item.name}
                                         image={item.avatar}
                            />
                        </Link>
                    </Grid>
                )}
            </Grid>
        </div>
    )
}

const mapStatesToProps = state => {
    return {
        users: state.users.users
    }
};

export default connect(mapStatesToProps, {getUsers})(Users)