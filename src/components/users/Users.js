import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {getUsers} from "../../store/users/authActions";
import ProfileCard from "./Profile";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        background: '#fff',

        padding: 20
    },
    card: {
        // margin: '30px auto',
        // width: '50%',
        // minWidth: 375,
        // '& .MuiPaper-elevation1': {
        //     margin: 10,
        //     boxShadow: '0px 1px 7px 1px rgba(0,0,0,0.2), -1px 1px 0px 0px rgba(0,0,0,0.14), 0px 0px 0px -1px rgba(0,0,0,0.12)'
        // }
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