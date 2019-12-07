import React, {useEffect} from 'react'
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import makeStyles from '@material-ui/core/styles/makeStyles'
import Button from "@material-ui/core/Button";
import {DISHES_FORM, DISHES_SINGLE} from "../dashboard/Tabs";
import Dish from "./Dish";
import {getDishes} from "../../store/dishes/dishesActions";

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

function Dishes(props) {
    const classes = useStyles();

    useEffect(() => {
        props.getDishes();
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.filter}>
                <Button color={"primary"} onClick={() => props.setDishes(DISHES_FORM)}>Create review</Button>
            </div>
            <Grid container spacing={1}>
                {props.dishes.length > 0 && (
                    props.dishes.map((dish, index) => (
                        <Grid item xs={12} onClick={() => props.handleSingleDish(DISHES_SINGLE, dish)}>
                            <Dish dish={dish} />
                        </Grid>
                    ))
                )}
            </Grid>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.dishes.isLoading,
        error: state.dishes.error,
        dishes: state.dishes.dishes
    }
};

export default connect(mapStateToProps, {getDishes})(Dishes)