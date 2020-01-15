import React from 'react'
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import makeStyle from '@material-ui/core/styles/makeStyles'
import Rating from '@material-ui/lab/Rating';
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import {connect} from "react-redux";

const useStyles = makeStyle({
    root: {
        background: 'white',
        paddingLeft: 20,
        paddingRight: 20,
    },
    card: {
        display: "flex",
        alignItems: "flex-start",
        marginTop: 15,
        width: "100%",
        margin: "auto",
        maxWidth: 900,
    },
    top: {
        display: "flex",
        justifyContent: 'space-between',
        alignItems: "center"
    },
    cardContent: {
        display: "flex",
        alignItems: "flex-start",
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
    },
    btn: {
        margin: 10,
        whiteSpace: 'nowrap'
    }
});

function RestaurantSingleView(props) {
    const {restaurants} = props;
    const id = props.match.params.id
    const restaurant = restaurants.find(item => item.id === parseInt(id))

    const classes = useStyles();
    return (
        <div className={classes.root}>
            {restaurant &&
            <>
                <div className={classes.top}>
                    <Button color={"secondary"} onClick={() => props.history.push('/dashboard/restaurants/')}>Back</Button>
                    <div className={classes.top}>
                        <Button color={"primary"} className={classes.btn}>Create a review</Button>
                        <Rating name="read-only" value={restaurant.rating} readOnly/>
                    </div>
                </div>
                <div className={classes.card}>
                    <div className={classes.cardContent}>
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
            }
        </div>
    )
}

const mapStatesToProps = state => {
    return {
        restaurants: state.restaurants.restaurants,
    }
}

export default connect(mapStatesToProps)(RestaurantSingleView)