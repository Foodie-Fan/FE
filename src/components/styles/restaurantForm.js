import makeStyles from '@material-ui/core/styles/makeStyles'

export const useFormStyles = makeStyles({
    root: {
        background: 'white',
        marginTop: 20,
        borderRadius: 4,
        border: '0.8px solid #e8e8e8',
        padding: 20,
    },
    form: {
        display: "flex",
        flexDirection: "column",
        width: "40%",
        minWidth: "300px",
        margin: "auto",
        marginBottom: 30,
    },
    title: {
        marginBottom: 30,
    },
    label: {
        display: "flex",
        flexDirection: "column",
        marginBottom: 15
    },
    errorLabel: {
        color: "red"
    },
    input: {
        height: "35px",
        borderRadius: "5px",
        border: "1.5px solid #00dee0",
        width: "100%",
        paddingLeft: 15,
        "&:hover": {
            color: "#00c9cb",
        },
    },
    errorField: {
        border: "1.5px solid #FF472C",
        borderRadius: "4px",
        '&:hover': {
            border: "1.5px solid #FF472C",
        }
    },
    errorMessage: {
        color: '#ffce0b',
    },
    rating: {
        marginTop: 15,
        marginBottom: 15,
        margin: "auto"
    },
    submitBtn: {
        outline: 'none',
        position: "relative",
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
        pointerEvents: props => props.isLoading && 'none',
        "&:hover": {
            background: "#379de6",
            color: 'white',
        },
    },
});