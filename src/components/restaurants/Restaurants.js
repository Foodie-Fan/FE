import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {getRestaurants} from "../../store/restaurants/restaurantsActions";
import Grid from "@material-ui/core/Grid";
import Restaurant from "./Restaurant";
import makeStyles from '@material-ui/core/styles/makeStyles'
import Button from "@material-ui/core/Button";
import {withRouter} from "react-router-dom";
import Filters from "../filter/Filter";
import dish from './dish.jpg'
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        paddingTop: 20,
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column'
        }
    },
    content: {
        background: "white",
        borderRadius: 4,
        border: '0.8px solid #e8e8e8',
        padding: 5,
    },

    filters: {
        height: "100%",
        width: "30%",
        marginTop: 0,
        marginRight: 20,
        [theme.breakpoints.down('md')]: {
            width: "80%",
            margin: '0 auto',
        }
    },
    filter: {
        background: "white",
        borderRadius: 4,
        border: '0.8px solid #e8e8e8',
        width: "100%",
        marginBottom: 20,
    },
    emptyImg: {
        height: 250,
        width: 'auto',
    },
    empty: {
        margin: 'auto',
        textAlign: 'center'
    },
}));

function Restaurants(props) {
    const classes = useStyles();

    useEffect(() => {
        props.getRestaurants();
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.filters}>
                <Button className={classes.filter} color={"primary"}
                        onClick={() => props.history.push("/dashboard/restaurants/create-restaurant")}>Create
                    restaurant
                </Button>
                <div className={classes.filter}>
                    <Filters state={false}/>
                </div>
            </div>
            <Grid container spacing={1} className={classes.content}>
                {props.restaurants.length > 0 ? (
                        props.restaurants.map((restaurant, index) => (
                            <Grid item xs={6} sm={4} md={3} key={index}>
                                <Restaurant key={restaurant.id} restaurant={restaurant}/>
                            </Grid>
                        ))
                    )
                    :
                    <div className={classes.empty}>
                        <img src={dish} className={classes.emptyImg}/>
                        <Typography style={{color: 'red'}} variant={"h6"}>You don`t have any restaurants yet</Typography>
                    </div>
                }
            </Grid>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.restaurants.isLoading,
        error: state.restaurants.error,
        restaurants: state.restaurants.filteredRestaurants
    }
};

export default connect(mapStateToProps, {getRestaurants})(withRouter(Restaurants))