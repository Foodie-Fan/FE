import React from 'react';
import {makeStyles, createStyles} from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Icon from "@material-ui/core/Icon";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';

const useStyles = makeStyles({
    close: {
        padding: '0,5',
    },
    content: {
        backgroundColor: "#ffbf4b",
        color: 'white',
    },
    msg: {
        display: 'flex',
        alignItems: "center"
    },
    icon: {
        fontSize: 20,
        opacity: 0.9,
        marginRight: '10px',
    },
});

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

export default function Toast(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(props.state);
    const Icon = variantIcon[props.variant];

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
            >
                <SnackbarContent
                    className={classes.content}
                    aria-describedby="message-id"
                    message={
                        <span className={classes.msg} id="message-id">
                              <Icon className={classes.icon}/>
                            {props.message}
                         </span>
                    }
                    action={[
                        <IconButton
                            key="close"
                            aria-label="close"
                            color="inherit"
                            className={classes.close}
                            onClick={handleClose}
                        >
                            <CloseIcon/>
                        </IconButton>,
                    ]}
                />
            </Snackbar>
        </div>
    );
}