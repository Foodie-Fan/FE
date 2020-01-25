import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {getUser} from "../../store/users/authActions";
//Routes
import {Route} from "react-router-dom";
import Restaurants from "../restaurants/Restaurants";
import Dishes from "../dishes/Dishes";
import TabLinks from "./TabLinks";
import RestaurantSingleView from "../restaurants/RestaurantSingleView";
import RestaurantForm from "../restaurants/RestaurantForm";
import DishForm from "../dishes/DishForm";
import ProfileCard from "./Profile";
import Users from "../users/Users";
import ProfilePage from "../users/ProfilePage";

function Dashboard(props) {
    const [image, setImage] = useState();
    useEffect(() => {
        props.getUser();
    }, []);
    return (
        <>
            <ProfileCard {...props}  profile={true}/>

            {/*Router links*/}
            <TabLinks/>

            {/*Routs*/}

            <Route path={"/dashboard/restaurants/single/:id"} component={RestaurantSingleView}/>
            <Route exact path={"/dashboard/restaurants"} component={Restaurants}/>
            <Route path={"/dashboard/restaurants/create-restaurant"} component={RestaurantForm}/>
            <Route path={"/dashboard/restaurants/edit-restaurant/:id"} render={props => <RestaurantForm {...props} state={true} />}/>

            <Route exact path={"/dashboard/dishes"} component={Dishes}/>
            <Route path={"/dashboard/dishes/create-review"} component={DishForm}/>

            <Route path={'/dashboard/profile/:id'} component={ProfilePage}/>
            <Route exact path={'/dashboard/people'} component={Users}/>
            {/*<IconLabelTabs/>*/}
        </>
    )
}

const mapPropsToState = state => {
    return {
        username: state.users.username,
        name: state.users.name,
        image: state.users.image,
        restaurants: state.users.restaurants,
        reviews: state.users.reviews,
    }
};

export default connect(mapPropsToState, {getUser})(Dashboard);