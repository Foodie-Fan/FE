import React, {useEffect, useState} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";
import {getUser} from "../../store/users/authActions";
import Avatar from "@material-ui/core/Avatar";
import Resizer from 'react-image-file-resizer';
import IconLabelTabs from "./Tabs";
//Routes
import {Route} from "react-router-dom";
import Restaurants from "../restaurants/Restaurants";
import Dishes from "../dishes/Dishes";
import TabLinks from "./TabLinks";
import RestaurantSingleView from "../restaurants/RestaurantSingleView";
import Dish from "../dishes/Dish";
import RestaurantForm from "../restaurants/RestaurantForm";
import DishForm from "../dishes/DishForm";

const useStyles = makeStyles(theme =>({
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
        [theme.breakpoints.up('sm')]:{
            justifyContent: "flex-end"
        }
    },
    infoTitle: {
        textAlign: 'center',
        color: '#535353',
        [theme.breakpoints.up('sm')]:{
            marginRight: 15,
        }
    }
}));

function Dashboard(props) {
    const classes = useStyles();
    const [image, setImage] = useState();
    useEffect(() => {
        props.getUser();
    }, []);
    return (
        <>
            <div className={classes.profileContainer}>
                <Avatar alt="Remy Sharp" src={props.image} className={classes.avatar}/>
                <div className={classes.userInfo}>
                    <Typography className={classes.username}>@{props.username}</Typography>
                    <Typography variant={"h5"}>{props.name}</Typography>
                    <div className={classes.info}>
                        <Typography className={classes.infoTitle}>Restaurants: 87</Typography>
                        <Typography className={classes.infoTitle}>Dishes: 230</Typography>
                    </div>
                </div>
            </div>

            {/*Router links*/}
            <TabLinks/>

            {/*Routs*/}

            <Route path={"/dashboard/restaurants/single/:id"} component={RestaurantSingleView}/>
            <Route exact path={"/dashboard/restaurants"} component={Restaurants}/>
            <Route path={"/dashboard/restaurants/create-restaurant"} component={RestaurantForm}/>

            <Route exact path={"/dashboard/dishes"} component={Dishes}/>
            <Route path={"/dashboard/dishes/create-review"} component={DishForm}/>

            <Route path={"/settings"} component={Restaurants}/>
            {/*<IconLabelTabs/>*/}
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