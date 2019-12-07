import React from 'react'
import {Field, Form, withFormik} from "formik"
import * as Yup from 'yup'
import {useFormStyles} from '../styles/restaurantForm'
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ImgDropAndCrop from "../dropzone/ImgDropAndCrop";
import {connect} from "react-redux";
import {createRestaurant, setImage} from "../../store/restaurants/restaurantsActions";
import {RES_ALL} from "../dashboard/Tabs";

function RestaurantForm(props) {
    const classes = useFormStyles();
    const setFile = (img) => {
        props.setImage(img)
    };
    return (
        <>
            <Button color={"primary"} onClick={() => props.setRestaurant(RES_ALL)}>Back</Button>
            <Form className={classes.root}>
                <Typography variant={"h5"} className={classes.title}>
                    <Box textAlign={"center"}>
                        Create restaurant
                    </Box>
                </Typography>
                <label className={classes.label}>
                    Restaurant name
                    <Field type="text" name="name" placeholder="Restaurant name" className={classes.input}/>
                </label>

                <label className={classes.label}>
                    Type of cuisine
                    <Field type="text" name="cuisine" placeholder="Type of cuisine" className={classes.input}/>
                </label>

                <label className={classes.label}>
                    Location
                    <Field type="text" name="location" placeholder="Location" className={classes.input}/>
                </label>

                <label className={classes.label}>
                    Hours of operation
                    <Field type="text" name="hours" placeholder="Hours of operation" className={classes.input}/>
                </label>

                <label className={classes.label}>
                    Overall rating
                    <Field type="text" name="rating" placeholder="Overall rating" className={classes.input}/>
                </label>

                <label className={classes.label}>
                    Review
                    <Field type="text" name="review" placeholder="Review" className={classes.input}/>
                </label>

                <ImgDropAndCrop setImage={setFile}/>

                <button className={classes.submitBtn} type="submit">{props.isLoading ? "..." : "Submit "}</button>
            </Form>

        </>
    )
}

const RestaurantFormikForm = withFormik({
    mapPropsToValues({name, cuisine, location, hours, rating, review, photo}) {
        return {
            name: name || '',
            cuisine: cuisine || '',
            location: location || '',
            hours: hours || '',
            rating: rating || '',
            review: review || '',
            photo: photo || ''
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Please enter restaurant name"),
        cuisine: Yup.string().required("Please enter your type of cuisine"),
        hours: Yup.string().required("Please enter hours of operation"),
        rating: Yup.string().required("Please enter rating"),
        review: Yup.string().required("Please enter your review"),
    }),

    handleSubmit(values, {props}) {
        console.log('res_image ', props.file);
        const fd = new FormData();
        fd.append('name', values.name);
        fd.append('cuisine', values.cuisine);
        fd.append('location', values.location);
        fd.append('hours', values.hours);
        fd.append('rating', values.rating);
        fd.append('review', values.review);
        fd.append('photo', props.file);
        props.createRestaurant(fd)
    }

})(RestaurantForm);

const mapPropsToState = state => {
    return {
        file: state.restaurants.file,
    }
};

export default connect(mapPropsToState, {createRestaurant, setImage})(RestaurantFormikForm)