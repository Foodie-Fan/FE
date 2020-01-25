import React, {useEffect} from 'react'
import {Field, Form, withFormik} from "formik"
import * as Yup from 'yup'
import {useFormStyles} from '../styles/restaurantForm'
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ImgDropAndCrop from "../dropzone/ImgDropAndCrop";
import {connect} from "react-redux";
import {createDish, setImage} from "../../store/dishes/dishesActions";
import Rating from "@material-ui/lab/Rating";
import SearchField from "../search/Search";
import {getRestaurants} from "../../store/restaurants/restaurantsActions";

function DishForm(props) {
    const classes = useFormStyles();
    const [value, setValue] = React.useState(2);
    //Control restaurant field
    const [restaurant, setR] = React.useState("");

    const setRestaurant = (val) => {
        if (props.restaurants.length > 0){
            const restaurant = props.restaurants.find(item => item.name === val)
            if(restaurant){
                props.setFieldValue('restaurant_id', restaurant.id)
            }
            setR(val)
        }
    }

    useEffect(() => {
        props.getRestaurants()
    }, [])

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
            <Button color={"primary"} onClick={() => props.history.push('/dashboard/dishes/')}>Back</Button>
            {props.restaurants &&
            <Form className={classes.form}>
                <Typography variant={"h5"} className={classes.title}>
                    <Box textAlign={"center"}>
                        Create a review
                    </Box>
                </Typography>

                <label className={`${classes.label} ${defineLabelError('name')}`}>
                    Review name*
                    <Field type="text" name="name" placeholder="Restaurant name"
                           className={`${classes.input} ${defineError('name')}`}/>
                </label>

                <label className={`${classes.label} ${defineLabelError('cuisine')}`}>
                    Type of cuisine*
                    <Field type="text" name="cuisine" placeholder="Type of cuisine"
                           className={`${classes.input} ${defineError('cuisine')}`}/>
                </label>

                {/*restaurant id*/}
                <label className={`${classes.label} ${defineLabelError('restaurant_id')}`}>
                    Restaurant*
                    <SearchField items={props.restaurants}
                                 restaurant={restaurant}
                                 setRestaurant={setRestaurant}
                                 err={!!(props.touched['restaurant_id'] && props.errors['restaurant_id'])}
                    />
                </label>

                {/*price*/}
                <label className={`${classes.label} ${defineLabelError('price')}`}>
                    Price*
                    <Field type="number" name="price" placeholder="Review"
                           className={`${classes.input} ${defineError('price')}`}/>
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
            }


        </div>
    )
}

const DishFormikForm = withFormik({
    mapPropsToValues({name, cuisine, restaurant_id, rating, review, photo, price}) {
        return {
            name: name || '',
            cuisine: cuisine || '',
            restaurant_id: restaurant_id || '',
            price: price || 0,
            rating: rating || 2,
            review: review || '',
            photo: photo || ''
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Please enter restaurant name"),
        cuisine: Yup.string().required("Please enter your type of cuisine"),
        review: Yup.string().required("Please enter your review"),
        price: Yup.string().required("Please enter your review"),
        restaurant_id: Yup.string().required("Please enter your review"),
    }),

    handleSubmit(values, {props}) {
        const fd = new FormData();
        fd.append('name', values.name);
        fd.append('cuisine', values.cuisine);
        fd.append('restaurant_id', values.restaurant_id);
        fd.append('rating', values.rating);
        fd.append('review', values.review);
        fd.append('price', values.price);
        fd.append('photo', props.file);
        props.createDish(fd, props.history)
    }

})(DishForm);

const mapPropsToState = state => {
    return {
        file: state.dishes.file,
        restaurants: state.restaurants.restaurants
    }
};

export default connect(mapPropsToState, {getRestaurants, createDish, setImage})(DishFormikForm)
