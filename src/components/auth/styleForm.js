import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    title: {
      textAlign: 'center',
        margin: '10px 0 20px 0',
    },
    formBorder: {
        border: '1.5px solid #EDEDED',
        width: '40%',
        padding: '20px 0 0 0',
        borderRadius: '3px',
        margin: 'auto',
        marginBottom: 100,
        minWidth: '500px',
        backgroundColor: "#ffffff99",
    },
    note: {
        color: "#aaacab",
        fontSize: '0.9rem',
        width: '60%',
        margin: 'auto'
    },
    noteText: {
        padding: 15,
    },
    submitBtn: {
        outline: 'none',
        position: 'relative',
        background: "#328ece",
        color: 'white',
        fontSize: '1rem',
        border: '1px solid #09adcb',
        width: '30%',
        height: '2.4rem',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '30px',
        margin: 'auto',
        "&:hover": {
            background: "#379de6",
            color: 'white',
        },
    },
    formContainer: {
        paddingLeft: '5rem',
        paddingRight: '5rem',
    },
    field: {
        margin: '0 10px 15px 10px',
        border: "1.5px solid #00dee0",
        borderRadius: '5px',
        height: '35px',
        width: '100%',
        paddingLeft: 30,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 5,
        "&:hover": {
            color: "#00c9cb",
        },
    },
    labelContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    label: {
        minWidth: 80,
    },
    errorBlock: {
        background: '#eeeeee',
    },
    error: {
        color: 'red',
        borderLeft: '6px solid #FA5656',
        border: '1px solid #faf8f8',
        borderRadius: '2px',
        background: "#fcf0f0",
        padding: '10px 10px 10px 15px',
        fontSize: '0.8rem',
        margin: '0 10px 15px 10px',
        width: '100%',
    },
    iconArea: {
        position: 'relative',
        marginRight: 2,
        width: '100%',
    },
    icon: {
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
        marginLeft: 15,
        padding: 0,
        height: '35px',
        color: '#80c2ea',
    },
});

export default useStyles;