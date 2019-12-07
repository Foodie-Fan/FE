import React from 'react'
import {connect} from "react-redux";
import {setImage} from "../../store/users/authActions";

function LoadAvatar() {
    return (
        <>

        </>
    )
}

const mapPropsToState = state => {
    return {
        image: state.users.image,
    }
};

export default connect(mapPropsToState, {setImage})(LoadAvatar);