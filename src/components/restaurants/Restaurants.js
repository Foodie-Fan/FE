import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {getRestaurants} from "../../store/restaurants/restaurantsActions";
import Grid from "@material-ui/core/Grid";
import Restaurant from "./Restaurant";
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column'
        }
    },
    filter: {
        height: "100%",
        width: "25%",
    }
}));

function Restaurants(props) {
    const classes = useStyles();

    useEffect(() => {
        props.getRestaurants();
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.filter}>
                filter
            </div>
            <Grid container spacing={1}>
                {props.restaurants.length > 0 && (
                    props.restaurants.map((restaurant, index) => (
                        <Grid item xs={12} sm={4} md={3}>
                            <Restaurant restaurant={restaurant}/>
                        </Grid>
                    ))
                )}
            </Grid>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.restaurants.isLoading,
        error: state.restaurants.error,
        restaurants: state.restaurants.restaurants
    }
};

export default connect(mapStateToProps, {getRestaurants})(Restaurants)