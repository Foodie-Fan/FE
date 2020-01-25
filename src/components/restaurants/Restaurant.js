import React, {useState} from 'react'
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"
import CardMedia from "@material-ui/core/CardMedia"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import {DeleteForever} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {deleteRestaurant} from "../../store/restaurants/restaurantsActions";

function Restaurant(props) {
    const {restaurant} = props;
    const [dialog, setDialog] = useState(false);

    const handleClickOpen = () => {
        setDialog(true);
    };

    const handleClose = () => {
        setDialog(false);
    };

    const deleteRestaurant = () => {
        props.deleteRestaurant(restaurant.id);
        setDialog(false);
    };

    return (
        <Card style={{position: 'relative'}}>
            <Dialog
                open={dialog}
                onClose={handleClose}
            >
                <DialogTitle
                    id="alert-dialog-title">{`Are you sure you want to delete ${restaurant.name} restaurant?`}</DialogTitle>
                <DialogActions style={{margin: '0 auto'}}>
                    <Button onClick={handleClose} style={{color: '#2468ff'}}>
                        No
                    </Button>
                    <Button onClick={deleteRestaurant} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>


            <IconButton onClick={handleClickOpen}
                        style={{position: "absolute", right: 0, zIndex: 2}}>
                <DeleteForever/>
            </IconButton>

            <Link to={`/dashboard/restaurants/single/${restaurant.id}`}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image={restaurant.photo}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {restaurant.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {restaurant.cuisine && (
                                `Cuisine: ${restaurant.cuisine}`
                            )}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {restaurant.hours && ` Hours of operation: ${restaurant.hours}`}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
    )
}

export default connect(null, {deleteRestaurant})(Restaurant)