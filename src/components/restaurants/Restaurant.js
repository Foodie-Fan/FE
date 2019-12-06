import React from 'react'
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"
import CardMedia from "@material-ui/core/CardMedia"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"

function Restaurant(props) {
    const {restaurant} = props;

    return (
        <Card>
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
        </Card>
    )
}

export default Restaurant