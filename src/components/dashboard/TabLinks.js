import React from 'react'
import {NavLink as RouterLink} from "react-router-dom";
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: "space-around",
        alignItems: "center",
        height: '60px',
        border: "1px solid #dbdbdb",
        background: 'white',
        borderRadius: 10,
    },
    active: {
        color: '#D80000'
    },
    link: {
        '&:hover': {
            color: '#ff0000'
        }
    }
}))


function TabLinks() {
    const classes = useStyles()
    return (
        <nav className={classes.root}>
            <RouterLink to={'/dashboard/restaurants'} className={classes.link} activeClassName={classes.active}>
                <Typography variant={"subtitle1"}>RESTAURANTS</Typography>
            </RouterLink>
            <RouterLink to={'/dashboard/dishes'} className={classes.link} activeClassName={classes.active}>
                <Typography variant={"subtitle1"}>DISHES</Typography>
            </RouterLink>
            <RouterLink to={'/dashboard/people'} className={classes.link} activeClassName={classes.active}>
                <Typography variant={"subtitle1"}>PEOPLE</Typography>
            </RouterLink>
        </nav>
    )
}

export default TabLinks