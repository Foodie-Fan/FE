import React, {useEffect, useState} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";
import {getUser} from "../../store/users/authActions";
import Avatar from "@material-ui/core/Avatar";
import Resizer from 'react-image-file-resizer';
import VerticalTabs from "./Tabs";

const useStyles = makeStyles({
    profileContainer: {
        borderBottom: "1.5px solid #EDEDED",
        display: 'flex',
    },
    avatar: {
        margin: 10,
        width: 150,
        height: 150,
    },
    userInfo: {
        marginLeft: 70,
        marginTop: 20,
    },
    username: {
        marginBottom: 10,
        color: '#535353'
    }
});

function Dashboard(props) {
    const classes = useStyles();
    const [image, setImage] = useState();
    useEffect(() => {
            props.getUser();
        }, []);
    return (
        <>
            {console.log('IMAGE ', props.image)}
            <div className={classes.profileContainer}>
                <Avatar alt="Remy Sharp" src={props.image} className={classes.avatar}/>
                <div className={classes.userInfo}>
                    <Typography className={classes.username}>@{props.username}</Typography>
                    <Typography variant={"h5"}>{props.name}</Typography>
                </div>
            </div>
            <VerticalTabs />
        </>
    )
}

const mapPropsToState = state => {
    return {
        username: state.users.username,
        name: state.users.name,
        image: state.users.image,
    }
};

export default connect(mapPropsToState, {getUser})(Dashboard);