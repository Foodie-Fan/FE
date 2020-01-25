import React, {useEffect} from 'react'
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import makeStyles from '@material-ui/core/styles/makeStyles'
import Button from "@material-ui/core/Button";
import Dish from "./Dish";
import {getDishes} from "../../store/dishes/dishesActions";
import Filters from "../filter/Filter";
import burger from './burgerIcon.jpg'
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

function Dishes(props) {
    const classes = useStyles();

    useEffect(() => {
        props.getDishes();
    }, []);

    return (
        <div className={classes.root}>

            {/*left side*/}
            <div className={classes.filters}>
                <Button className={classes.filter} color={"primary"}
                        onClick={() => props.history.push('/dashboard/dishes/create-review')}>
                    Create review
                </Button>
                <div className={classes.filter}>
                    <Filters state={true}/>
                </div>
            </div>

            {/*right side*/}
            <Grid container spacing={1} className={classes.content}>
                {props.dishes.length > 0 ? (
                    props.dishes.map((dish, index) => (
                        <Grid item xs={12} key={index}>
                            <Dish dish={dish}/>
                        </Grid>
                    ))
                )
                :
                    <div  className={classes.empty}>
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
        dishes: state.dishes.filteredDishes
    }
};

export default connect(mapStateToProps, {getDishes})(Dishes)