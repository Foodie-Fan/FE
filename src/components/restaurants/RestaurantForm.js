import React from 'react'
import {Field, Formik, withFormik} from "formik";
import * as Yup from 'yup';


function RestaurantForm(props) {
    return (
        <>
            <Formik>
                <Field
                    type="text"
                    name="name"
                    placeholder="Restaurant name"
                />
                <Field
                    type="text"
                    name="cuisine"
                    placeholder="Type of cuisine"
                />
                <Field
                    type="text"
                    name="hours"
                    placeholder="Hours of operation"
                />
                <Field
                    type="text"
                    name="rating"
                    placeholder="Overall rating"
                />
                <Field
                    type="text"
                    name="review"
                    placeholder="Review"
                />
                <Field
                    type="text"
                    name="photo"
                    placeholder="Review"
                />
            </Formik>

        </>
    )
}

const RestaurantFormikForm = withFormik({
    mapPropsToValues({name, cuisine, hours, rating, review}) {
        return {
            name: name || '',
            cuisine: cuisine || '',
            hours: hours || '',
            rating: rating || '',
            review: review || ''
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Please enter restaurant name"),
        cuisine: Yup.string().required("Please enter your type of cuisine"),
        hours: Yup.string().required("Please enter hours of operation"),
        rating: Yup.string().required("Please enter rating"),
        review: Yup.string().required("Please enter your review"),
    }),

    handleSubmit() {

    }

})(RestaurantForm);

export default RestaurantFormikForm