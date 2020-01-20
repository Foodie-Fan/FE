import React from 'react'
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {useCardStyles} from '../dishes/CardStyles'
import CardActionArea from "@material-ui/core/CardActionArea";

export function ProfileCard(props) {
    const classes = useCardStyles();
    return (
        <Card className={classes.card}>
            <CardActionArea style={{display: 'flex'}}>
                <CardMedia
                    className={classes.img}
                    component="img"
                    image={props.image}
                />
                <CardContent className={classes.content}>
                    <Typography className={classes.username}>@{props.username}</Typography>
                    <Typography variant={"h5"}>{props.name}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default ProfileCard