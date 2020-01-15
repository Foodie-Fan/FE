import React from 'react'
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
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

function DishForm(props) {
    const classes = useFormStyles();
    const [value, setValue] = React.useState(2);
    //Control restaurant field
    const [restaurant, setRestaurant] = React.useState(null);

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
            <Button color={"secondary"} onClick={() => props.manageBack(props.back)}>Back</Button>
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

                <TextField label="disableCloseOnSelect" margin="normal" fullWidth
                           onChange={(e) => console.log(e.target.value)}/>

                <Autocomplete
                    id="controlled-demo"
                    options={props.restaurants}
                    getOptionLabel={option => option.name}
                    value={restaurant}
                    autoSelect={true}
                    onChange={(event, newValue) => {
                        console.log("step ", newValue);
                        if (newValue) {
                            setRestaurant(newValue.name);
                            props.setFieldValue('restaurant', newValue.name)
                        } else setRestaurant(newValue);
                    }}
                    renderInput={params => (
                        <TextField
                            {...params}
                            label={'Restaurant'}
                            margin="normal"
                            fullWidth
                            variant="outlined"/>)}
                />

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

const DishFormikForm = withFormik({
    mapPropsToValues({name, cuisine, restaurant, rating, review, photo}) {
        return {
            name: name || '',
            cuisine: cuisine || '',
            restaurant: restaurant || '',
            rating: rating || '',
            review: review || '',
            photo: photo || ''
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Please enter restaurant name"),
        cuisine: Yup.string().required("Please enter your type of cuisine"),
        review: Yup.string().required("Please enter your review"),
    }),

    handleSubmit(values, {props}) {
        console.log("restaurant ", values.restaurant)
        // console.log('res_image ', props.file);
        // const fd = new FormData();
        // fd.append('name', values.name);
        // fd.append('cuisine', values.cuisine);
        // fd.append('restaurant', values.restaurant);
        // fd.append('rating', values.rating);
        // fd.append('review', values.review);
        // fd.append('photo', props.file);
        // props.createDish(fd, props.setDishes)
    }

})(DishForm);

const mapPropsToState = state => {
    return {
        file: state.dishes.file,
        restaurants: state.restaurants.restaurants
    }
};

export default connect(mapPropsToState, {createDish, setImage})(DishFormikForm)