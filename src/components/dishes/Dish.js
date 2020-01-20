import React from 'react'
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import makeStyles from '@material-ui/core/styles/makeStyles'
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles({
    card: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    img: {
        width: '15%',
        minWidth: 130,
        maxWidth: 350
    },
    content: {
        width: '100%',
    },
    contentTop: {
        display: "flex",
        justifyContent: "space-between"
    }
});

export default function Dish(props) {
    const {dish} = props;
    const classes = useStyles();

    return (
        <Card className={classes.card} >
                <CardMedia
                    className={classes.img}
                    component="img"
                    image={dish.photo}
                />
                <CardContent className={classes.content}>
                    <div className={classes.contentTop}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {dish.name}
                        </Typography>
                        <Rating name="read-only" value={dish.rating} readOnly/>
                    </div>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Cuisine: {dish.cuisine}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Restaurant: {dish.restaurant}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Review: {dish.review}
                    </Typography>
                </CardContent>
        </Card>
    )
}