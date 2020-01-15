import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Restaurant from '@material-ui/icons/Restaurant';
import FastFood from '@material-ui/icons/Fastfood';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Typography from "@material-ui/core/Typography";
import * as PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Restaurants from "../restaurants/Restaurants";
import RestaurantFormikForm from "../restaurants/RestaurantForm";
import RestaurantSingleView from "../restaurants/RestaurantSingleView";
import Route from "react-router-dom/es/Route";
import Dishes from "../dishes/Dishes";
import DishFormikForm from "../dishes/DishForm";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        width: '100%',
        marginBottom: 30
    },
});


function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

//states for restaurant tab
export const RES_ALL = 'res_all';
export const RES_FORM = 'res_form';
export const RES_SINGLE = 'res_single';
export const RES_REVIEW = 'res_review';

export default function IconLabelTabs() {
    const classes = useStyles();
    //tab states
    const [value, setValue] = useState(0);
    //restaurant states
    const [restaurant, setRestaurant] = useState(RES_ALL);
    const [singleRestaurant, setSingleRestaurant] = useState();
    // review states
    const [dishes, setDishes] = useState(true);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSingleRestaurant = (r, s) => {
        setRestaurant(r);
        setSingleRestaurant(s)
    };

    return (
        <Paper square className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="secondary"
                aria-label="icon label tabs example"
            >
                <Tab icon={<Restaurant/>} label="RESTAURANTS" onClick={() => setRestaurant(RES_ALL)}/>
                <Tab icon={<FastFood/>} label="DISHES" onClick={() => setDishes(true)}/>
                <Tab icon={<PersonPinIcon/>} label="SETTINGS"/>
            </Tabs>
            <TabPanel value={value} index={0}>
                {restaurant === RES_ALL &&
                <Restaurants setRestaurant={setRestaurant} handleSingleRestaurant={handleSingleRestaurant}/>}
                {restaurant === RES_FORM && <RestaurantFormikForm setRestaurant={setRestaurant}/>}
                {restaurant === RES_SINGLE &&
                <RestaurantSingleView restaurant={singleRestaurant} setRestaurant={setRestaurant}/>}
                {restaurant === RES_REVIEW && <DishFormikForm back={RES_ALL} manageBack={setRestaurant}/>}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {dishes && <Dishes setDishes={setDishes}/>}
                {!dishes && <DishFormikForm setDishes={setDishes}/>}
                {/*{dishes === DISHES_SINGLE && <RestaurantSingleView dish={singleDish} setRestaurant={setRestaurant}/>}*/}

            </TabPanel>
            <TabPanel value={value} index={2}>
                Page Three
            </TabPanel>
        </Paper>
    );
}