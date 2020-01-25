import React, {useEffect} from 'react'
import {Field, Form, withFormik} from "formik"
import * as Yup from 'yup'
import {useFormStyles} from '../styles/restaurantForm'
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ImgDropAndCrop from "../dropzone/ImgDropAndCrop";
import {connect} from "react-redux";
import {createRestaurant, getRestaurants, setImage, updateRestaurant} from "../../store/restaurants/restaurantsActions";
import Rating from "@material-ui/lab/Rating";

function RestaurantForm(props) {
    const classes = useFormStyles();
    const [value, setValue] = React.useState(2);

    useEffect(() => {
        if(props.state){
            props.getRestaurants();
        }
    }, []);

    const id = props.match.params.id;
    const restaurant = props.restaurants.length > 0 ? props.restaurants.find(item => item.id === parseInt(id)) : [];

    useEffect(() => {
        if (props.state){
            props.setFieldValue('name', restaurant.name);
            props.setFieldValue('cuisine', restaurant.cuisine);
            props.setFieldValue('loca', restaurant.location);
            props.setFieldValue('hours', restaurant.hours);
            props.setFieldValue('rating', restaurant.rating);
            setValue(restaurant.rating);
            props.setFieldValue('review', restaurant.review);
        }
    }, [props.restaurants]);

    const setFile = (img) => {
        props.setImage(img)
    };

    const defineError = (name) => {
        if (props.touched[name] && props.errors[name]) return `${classes.errorField}`
    };

    const defineLabelError = (name) => {
        if (props.touched[name] && props.errors[name]) return `${classes.errorLabel}`
    };

    return (
        <div className={classes.root}>
            <Button color={"primary"}
                    onClick={() => props.state ? props.history.push(`/dashboard/restaurants/single/${id}`) : props.history.push('/dashboard/restaurants/')}>Back</Button>
            <Form className={classes.form}>
                <Typography variant={"h5"} className={classes.title}>
                    <Box textAlign={"center"}>
                        {props.state ? 'Edit restaurant' : 'Create restaurant'}
                    </Box>
                </Typography>
                <label className={`${classes.label} ${defineLabelError('name')}`}>
                    Restaurant name*
                    <Field type="text" name="name" placeholder="Restaurant name"
                           className={`${classes.input} ${defineError('name')}`}/>
                </label>

                <label className={`${classes.label} ${defineLabelError('cuisine')}`}>
                    Type of cuisine*
                    <Field type="text" name="cuisine" placeholder="Type of cuisine"
                           className={`${classes.input} ${defineError('cuisine')}`}/>
                </label>

                <label className={`${classes.label} ${defineLabelError('loca')}`}>
                    Location*
                    <Field type="text" name="loca" placeholder="Location"
                           className={`${classes.input} ${defineError('loca')}`}/>
                </label>

                <label className={`${classes.label} ${defineLabelError('hours')}`}>
                    Hours of operation*
                    <Field type="text" name="hours" placeholder="Hours of operation"
                           className={`${classes.input} ${defineError('hours')}`}/>
                </label>

                <label className={`${classes.label} ${defineLabelError('review')}`}>
                    Review*
                    <Field type="text" name="review" placeholder="Review"
                           className={`${classes.input} ${defineError('review')}`}/>
                </label>

                <Rating
                    className={classes.rating}
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        props.setFieldValue("rating", newValue);
                    }}
                />

                <ImgDropAndCrop setImage={setFile}/>

                <button className={classes.submitBtn} type="submit">{props.isLoading ? "..." : "Submit "}</button>
            </Form>

        </div>
    )
}

const RestaurantFormikForm = withFormik({
    mapPropsToValues({name, cuisine, loca, hours, rating, review, photo}) {
        return {
            name: name || '',
            cuisine: cuisine || '',
            loca: loca || '',
            hours: hours || '',
            rating: rating || 2,
            review: review || '',
            photo: photo || ''
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Please enter restaurant name"),
        cuisine: Yup.string().required("Please enter your type of cuisine"),
        hours: Yup.string().required("Please enter hours of operation"),
        loca: Yup.string().required("Please enter location"),
        review: Yup.string().required("Please enter your review"),
    }),

    handleSubmit(values, {props}) {
        if (props.state) {
            const fd = new FormData();
            fd.append('name', values.name);
            fd.append('cuisine', values.cuisine);
            fd.append('location', values.loca);
            fd.append('hours', values.hours);
            fd.append('rating', values.rating);
            fd.append('review', values.review);
            if (props.file instanceof File) {
                fd.append('photo', props.file);
            }
            props.updateRestaurant(props.match.params.id, fd, props.history)
        } else {
            const fd = new FormData();
            fd.append('name', values.name);
            fd.append('cuisine', values.cuisine);
            fd.append('location', values.loca);
            fd.append('hours', values.hours);
            fd.append('rating', values.rating);
            fd.append('review', values.review);
            fd.append('photo', props.file);
            props.createRestaurant(fd, props.history)
        }
    }

})(RestaurantForm);

const mapPropsToState = state => {
    return {
        file: state.restaurants.file,
        restaurants: state.restaurants.restaurants
    }
};

export default connect(mapPropsToState, {
    createRestaurant,
    setImage,
    getRestaurants,
    updateRestaurant
})(RestaurantFormikForm)