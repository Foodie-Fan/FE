import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {getUsers} from "../../store/users/authActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import makeStyles from '@material-ui/core/styles/makeStyles'
import {getProfileReviews} from "../../store/dishes/dishesActions";
import Grid from "@material-ui/core/Grid";
import Dish from "../dishes/Dish";

const useStyles = makeStyles({
    root: {
        background: 'white',
        marginTop: 20,
        borderRadius: 4,
        border: '0.8px solid #e8e8e8',
        padding: 20,
    },
    profileCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        width: '90%',
        margin: '0 auto',
        borderBottom: "1.5px solid #EDEDED",
    },
    avatar: {
        width: 150,
        height: 'auto'
    },
    dishCard: {
        margin: '30px auto',
        maxWidth: '75%',
        minWidth: 375,
        '& .MuiPaper-elevation1': {
            margin: 10,
            boxShadow: '0px 1px 7px 1px rgba(0,0,0,0.2), -1px 1px 0px 0px rgba(0,0,0,0.14), 0px 0px 0px -1px rgba(0,0,0,0.12)'
        }
    },
});


function ProfilePage(props) {
    const classes = useStyles();
    const id = props.match.params.id;

    useEffect(() => {
        props.getUsers();
        props.getProfileReviews(id)
    }, []);

    const user = props.users.find(item => item.id === parseInt(id));
    return (
        <>
            {user &&
            <div className={classes.root}>
                <div className={classes.profileCard}>
                    <Avatar src={user.avatar} className={classes.avatar}/>
                    <Typography variant={"h5"}>{user.name}</Typography>
                </div>
                <Grid container spacing={1} className={classes.dishCard}>
                    {props.dishes.map((item, index) => <Grid item xs={12} key={index}> <Dish dish={item}/></Grid>)}
                </Grid>
            </div>
            }
        </>
    )
}

const mapStatesToProps = state => {
    return {
        users: state.users.users,
        dishes: state.dishes.profileReviews
    }
};

export default connect(mapStatesToProps, {getUsers, getProfileReviews})(ProfilePage)