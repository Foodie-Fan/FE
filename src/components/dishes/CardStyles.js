import makeStyles from "@material-ui/core/styles/makeStyles";

export const useCardStyles = makeStyles({
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