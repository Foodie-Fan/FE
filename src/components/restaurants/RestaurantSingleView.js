import React from 'react'
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {RES_ALL} from "../dashboard/Tabs";
import makeStyle from '@material-ui/core/styles/makeStyles'
import Rating from '@material-ui/lab/Rating';
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyle({
    root: {
        display: "flex",
        alignItems: "flex-start",
        marginTop: 15,
        width: "100%",
        margin: "auto",
        maxWidth: 900
    },
    top: {
        display: "flex",
        justifyContent: 'space-between',
        alignItems: "center"
    },
    card: {
        display: "flex",
        alignItems: "flex-start"
    },
    img: {
        width: '70%',
        minWidth: 130,
        maxWidth: 350
    },
    content: {
        marginLeft: 20,
        width: "100%"
    },
    title: {
        marginBottom: 15
    },
    text: {
        whiteSpace: "nowrap"
    }
});

export default function RestaurantSingleView(props) {
    const {restaurant} = props;
    const classes = useStyles();
    return (
        <>
            <div className={classes.top}>
                <Button color={"primary"} onClick={() => props.setRestaurant(RES_ALL)}>Back</Button>
                <Rating name="read-only" value={restaurant.rating} readOnly/>
            </div>
            <div className={classes.root}>
                <div className={classes.card}>
                    <img src={restaurant.photo} className={classes.img}/>
                    <div className={classes.content}>
                        <Typography variant={"h5"} className={classes.title}>{restaurant.name}</Typography>
                        <Typography color={"secondary"} className={classes.text}>Type of
                            cusine: {restaurant.cuisine}</Typography>
                        <Typography color={"secondary"}
                                    className={classes.text}>Location: {restaurant.location}</Typography>
                        <Typography color={"secondary"}>Review: {restaurant.review}</Typography>
                    </div>
                </div>
            </div>
            <Typography color={"secondary"}>
                <Box textAlign={'right'}>Hours of operation: {restaurant.hours}</Box>
            </Typography>
            <Divider/>

        </>
    )
}