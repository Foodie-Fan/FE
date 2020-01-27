import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import makeStyles from '@material-ui/core/styles/makeStyles'
import Button from "@material-ui/core/Button";
import Dish from "./Dish";
import {getDishes} from "../../store/dishes/dishesActions";
import Filters from "../filter/Filter";
import burger from './burgerIcon.jpg'
import Typography from "@material-ui/core/Typography";
import {getRestaurants} from "../../store/restaurants/restaurantsActions";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Card from "@material-ui/core/Card";

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
        paddingTop: 100,
    },
}));

function Dishes(props) {
    const classes = useStyles();

    useEffect(() => {
        props.getDishes();
        props.getRestaurants();
    }, []);

    const [dialog, setDialog] = useState(false);

    const handleClickOpen = () => {
        setDialog(true);
    };

    const handleClose = () => {
        setDialog(false);
    };

    return (
        <div className={classes.root}>

            <Dialog
                open={dialog}
                onClose={handleClose}
            >
                <DialogTitle
                    id="alert-dialog-title">You don`t have any restaurants yet. Do you want to create your first
                    restaurant?</DialogTitle>
                <DialogActions style={{margin: '0 auto'}}>
                    <Button onClick={handleClose} style={{color: '#2468ff'}}>
                        No
                    </Button>
                    <Button color="primary" autoFocus
                            onClick={() => props.history.push('/dashboard/restaurants/create-restaurant')}>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            {/*left side*/}
            <div className={classes.filters}>
                {props.restaurants.length > 0 ?
                    <Button className={classes.filter} color={"primary"}
                            onClick={() => props.history.push('/dashboard/dishes/create-review')}>
                        Create review
                    </Button>
                    :
                    <Button className={classes.filter} color={"primary"} onClick={handleClickOpen}>
                        Create review
                    </Button>
                }

                <div className={classes.filter}>
                    <Filters state={true}/>
                </div>
            </div>

            {/*right side*/}
            <Grid container spacing={1} className={classes.content} alignContent={"flex-start"}>
                {
                    props.dishes.length > 0 ? (
                            props.dishes.map((dish, index) => (
                                <Grid item xs={12} key={index}>
                                    <Dish state={true} dish={dish}/>
                                </Grid>
                            )))
                        :
                        <div className={classes.empty}>
                            <img src={burger} className={classes.emptyImg}/>
                            <Typography style={{color: 'red'}} variant={"h6"}>You don`t have any dishes yet</Typography>
                        </div>
                }
            </Grid>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.dishes.isLoading,
        error: state.dishes.error,
        dishes: state.dishes.filteredDishes,
        restaurants: state.restaurants.restaurants,
    }
};

export default connect(mapStateToProps, {getDishes, getRestaurants})(Dishes)