import React, {useEffect} from 'react'
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import makeStyle from '@material-ui/core/styles/makeStyles'
import Rating from '@material-ui/lab/Rating';
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import {connect} from "react-redux";
import Dish from "../dishes/Dish";
import {getRestaurants} from "../../store/restaurants/restaurantsActions";
import {getDishes} from "../../store/dishes/dishesActions";
import Grid from "@material-ui/core/Grid";
import {Edit} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";

const useStyles = makeStyle({
    root: {
        background: 'white',
        marginTop: 20,
        borderRadius: 4,
        border: '0.8px solid #e8e8e8',
        padding: 20,
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
    dishCardTitle: {
        textAlign: "center",
        marginBottom: 25,
        marginTop: 25,
    }
});

function RestaurantSingleView(props) {
    const {restaurants} = props;
    const id = props.match.params.id
    const restaurant = restaurants.length > 0 ? restaurants.find(item => item.id === parseInt(id)) : []

    useEffect(() => {
        props.getRestaurants();
        props.getDishes();
    }, []);

    const classes = useStyles();
    return (
        <div className={classes.root}>
            {restaurant &&
            <>
                <div className={classes.top}>
                    <Button color={"primary"}
                            onClick={() => props.history.push('/dashboard/restaurants/')}>Back</Button>
                    <div className={classes.top}>
                        {/*<Button color={"primary"} className={classes.btn}>Create a review</Button>*/}
                        <Rating name="read-only" value={restaurant.rating} readOnly style={{paddingRight: 30}}/>
                        <IconButton onClick={() => props.history.push(`/dashboard/restaurants/edit-restaurant/${id}`)}>
                            <Edit/>
                        </IconButton>
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
            {console.log(props.dishes)}
            {props.dishes.length > 0 &&
            <RestaurantsDishes restaurant_id={id} dishes={props.dishes} restaurant_name={restaurant.name}/>
            }

        </div>
    )
}


function RestaurantsDishes(props) {
    const classes = useStyles()
    const dishes = props.dishes.filter(item => item.restaurant_id === parseInt(props.restaurant_id))
    return (
        <>
            <Typography variant={"h6"}
                        className={classes.dishCardTitle}>
                {props.restaurant_name} dishes:
            </Typography>
            <Grid container spacing={1} className={classes.dishCard}>
                {dishes.map((item, index) => <Grid item xs={12} key={index}> <Dish dish={item}/></Grid>)}
            </Grid>
        </>
    )
}

const mapStatesToProps = state => {
    return {
        restaurants: state.restaurants.restaurants,
        dishes: state.dishes.dishes,
    }
}

export default connect(mapStatesToProps, {getRestaurants, getDishes})(RestaurantSingleView)