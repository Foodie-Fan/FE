import React, {useState} from 'react';
import Search from "@material-ui/icons/Search";
import makeStyles from '@material-ui/core/styles/makeStyles'
import {withRouter} from "react-router-dom";
import {Field} from "formik";
import {useFormStyles} from "../styles/restaurantForm";

export const useStyles = makeStyles({
    root: {
        width: '100%'
    },
    select: {
        width: '100%',
        borderRadius: "5px",
        border: "1.5px solid #00dee0",
    },
    option: {
        padding: 8,
        borderBottom: "1.5px solid #EDEDED",
    },
    searchLabel: {
        fontSize: 12,
        marginRight: 15,
    },
    searchIcon: {
        position: 'absolute',
        right: 5,
        width: 17,
    },
    searchContainer: {
        width: '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-end',
        // margin: 20,
        alignItems: 'center',
    },
})

const SearchField = (props) => {
    const classes = useStyles()
    const classes_form = useFormStyles();
    const {items, restaurant, setRestaurant, err} = props;
    const [suggestions, setSuggestions] = useState(items);
    const [isOpen, setIsOpen] = useState(false);


    const handleSearch = (data) => {
        if (data.length > 0 && items.length > 0) {
            const keyword_part1 = new RegExp(`^${data}`, 'i');
            const updatedList_part1 = items.sort().filter(item => {
                return item.name.toLowerCase().search(keyword_part1) !== -1
            });
            const keyword_part2 = new RegExp(`${data}`, 'i');
            const updatedList_part2 = items.sort().filter(item => {
                return item.name.toLowerCase().search(keyword_part1) !== -1
            });
            const full_name = updatedList_part1.concat(updatedList_part2);
            setSuggestions(updatedList_part1.concat(updatedList_part2).filter((item, index) => full_name.indexOf(item) === index));
            if (suggestions.length > 0) setIsOpen(true)
        } else setSuggestions(items);
    };

    const field = React.createRef();
    const handleFocus = () => {
        field.current.focus();
    };


    return (
        <div className={classes.root}>
            <div>
                <div className={classes.searchContainer}>
                    <input type="text"
                           className={`${classes_form.input} ${err ? classes_form.errorField : ""}`}
                           placeholder={"Search..."}
                           ref={field}
                           value={restaurant}
                           onChange={(e) =>{
                               setRestaurant(e.target.value)
                               handleSearch(e.target.value)
                           }}
                           onBlur={() => setIsOpen(false)}
                           onFocus={() => setIsOpen(true)}
                    />
                    <Search className={classes.searchIcon}/>
                </div>
                {(isOpen && suggestions.length > 0) &&
                <select size={5} className={classes.select}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleFocus()
                        }}>
                    {
                        suggestions.map(item =>
                            <option className={classes.option}
                                    onClick={() => setRestaurant(item.name)}
                                    value={item.name}>
                                {item.name}
                            </option>)
                    }
                </select>
                }

            </div>
        </div>
    )
};

export default withRouter(SearchField);