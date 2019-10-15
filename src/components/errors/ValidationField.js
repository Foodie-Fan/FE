import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles({
    errorBlock: {
      background: '#eeeeee',
    },
    error: {
        color: 'red',
        fontSize: '0.8rem'
    }
});

const ValidationField = (error) => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.errorBlock}>
                <p className={classes.error}>Error{error}</p>
            </div>
        </>
    )
};

export default ValidationField;