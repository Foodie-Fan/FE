import React from 'react'
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
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
        marginLeft: 50,
        marginRight: 5,
        marginTop: 20,
        width: '100%',
    },
    username: {
        marginBottom: 10,
        color: '#535353'
    },
    info: {
        marginTop: 30,
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            justifyContent: "flex-end"
        }
    },
    infoTitle: {
        textAlign: 'center',
        color: '#535353',
        [theme.breakpoints.up('sm')]: {
            marginRight: 15,
        }
    }
}));

export function ProfileCard(props) {
    const classes = useStyles();
    return (
        <div className={classes.profileContainer}>
            <Avatar alt="Remy Sharp" src={props.image} className={classes.avatar}/>
            <div className={classes.userInfo}>
                <Typography className={classes.username}>@{props.username}</Typography>
                <Typography variant={"h5"}>{props.name}</Typography>
                {props.profile &&
                <div className={classes.info}>
                    <Typography className={classes.infoTitle}>Restaurants: {props.restaurants}</Typography>
                    <Typography className={classes.infoTitle}>Reviews: {props.reviews}</Typography>
                </div>
                }
            </div>
        </div>
    )
}

export default ProfileCard