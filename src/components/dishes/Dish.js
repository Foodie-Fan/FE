import React, {useState} from 'react'
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import {useCardStyles} from './CardStyles'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {DeleteForever, Edit} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import {connect} from "react-redux";
import {deleteDish} from "../../store/dishes/dishesActions";
import {withRouter} from "react-router-dom";


function Dish(props) {
    const {dish} = props;
    const classes = useCardStyles();
    const [dialog, setDialog] = useState(false);

    const handleClickOpen = () => {
        setDialog(true);
    };

    const handleClose = () => {
        setDialog(false);
    };

    const deleteReview = () => {
        props.deleteDish(dish.id);
        setDialog(false);
    }

    return (
        <Card className={classes.card}>
            <Dialog
                open={dialog}
                onClose={handleClose}
            >
                <DialogTitle
                    id="alert-dialog-title">{`Are you sure you want to delete ${dish.name} review?`}</DialogTitle>
                <DialogActions style={{margin: '0 auto'}}>
                    <Button onClick={handleClose} style={{color: '#2468ff'}}>
                        No
                    </Button>
                    <Button color="primary" autoFocus onClick={deleteReview}>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <CardMedia
                className={classes.img}
                component="img"
                image={dish.photo}
            />
            <CardContent className={classes.content}>

                <IconButton onClick={handleClickOpen}
                            style={{position: "absolute", right: 0, top: 0, zIndex: 2}}>
                    <DeleteForever/>
                </IconButton>

                <IconButton onClick={() => props.history.push(`/dashboard/dishes/edit-review/${dish.id}`)}
                            style={{position: "absolute", right: 40, top: 0, zIndex: 2}}>
                    <Edit/>
                </IconButton>

                <div className={classes.contentTop}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {dish.name}
                    </Typography>
                    <Rating name="read-only" value={dish.rating} readOnly style={{paddingRight: 80}}/>
                </div>
                <Typography variant="body2" color="textSecondary" component="p">
                    Cuisine: {dish.cuisine}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Restaurant: {dish.restaurant}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Price: {dish.price ? dish.price : '-'}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Review: {dish.review}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default connect(null, {deleteDish})(withRouter(Dish))