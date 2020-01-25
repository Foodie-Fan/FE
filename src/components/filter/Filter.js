import React from 'react'
import {Field, Form, withFormik} from "formik";
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from "@material-ui/core/Typography";
import filters from './Filter.png'
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {filterDishes} from "../../store/dishes/dishesActions";
import {filterRestaurants} from "../../store/restaurants/restaurantsActions";

const useFilterStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    },
    form: {
        width: '90%',
        margin: "0 auto",
        paddingBottom: 10,
    },
    field: {
        border: "1.5px solid #00dee0",
        borderRadius: '5px',
        height: '35px',
        width: '100%',
        margin: '5px 0',
        "&:hover": {
            color: "#00c9cb",
        },
    },
    filterIcon: {
        display: "flex",
        marginTop: 10,
        marginBottom: 10,
    },
    icon: {
        marginRight: 10,
    },
    btn: {
        display: "flex",
        alignItems: 'center',
        margin: "0 auto",
    }
}));

function Filter(props) {
    const styles = useFilterStyles();
    return (
        <div className={styles.root}>
            <Form className={styles.form}>
                <div className={styles.filterIcon}>
                    <img src={filters} className={styles.icon}/>
                    <Typography>Filters: </Typography>
                </div>

                {/*dish/restaurant name*/}
                <label>
                    Name:
                    <Field type="text"
                           name="name"
                           className={styles.field}
                    />
                </label>

                {/*dish - restaurant name*/}
                {props.state &&
                <label>
                    Restaurant name:
                    <Field type="text"
                           name="restaurant"
                           className={styles.field}
                    />
                </label>
                }

                {/*restaurant location*/}
                {!props.state &&
                <label>
                    Location:
                    <Field type="text"
                           name="location"
                           className={styles.field}
                    />
                </label>
                }
                {/*dish/restaurant rating*/}
                <label>
                    Rating:
                    <Field component="select"
                           name="rating"
                           className={styles.field}
                    >
                        <option value=''></option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </Field>
                </label>
                {/*dish/restaurant cuisine*/}
                <label>
                    Cuisine:
                    <Field type="text"
                           name="cuisine"
                           className={styles.field}
                    />
                </label>
                {/*dish/ price*/}
                {props.state &&
                <label>
                    Price:
                    <Field type="number"
                           name="price"
                           className={styles.field}
                    />
                </label>
                }
                <Button type={'submit'} color={"primary"} className={styles.btn}>Submit</Button>
            </Form>

        </div>
    )
}

const Filters = withFormik({
    mapPropsToValues({name, restaurant, location, rating, cuisine, price}) {
        return {
            name: name || '',
            restaurant: restaurant || '',
            location: location || '',
            rating: rating || '',
            cuisine: cuisine || '',
            price: price || ''
        }
    },
    handleSubmit(values, {props}) {
        if (props.state) {
            props.filterDishes(values)
        } else if (!props.state) {
            props.filterRestaurants(values)
        }
    }

})(Filter);


export default connect(null, {filterDishes, filterRestaurants})(Filters)
