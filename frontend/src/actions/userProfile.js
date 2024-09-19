import * as api from "../api/index.js";
import { UPDATE } from "../constants/actionTypes.js";
import { toast } from 'react-toastify';

const notifySuccess = (msg) => toast.success(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});
const notifyError = (msg) => toast.error(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const updateUserProfilePicture = (userPicture) => async (dispatch) => {
    try {
        const formData = new FormData();
        formData.append('profilePicture', userPicture.profilePicture);
        const { data } = await api.updateUserProfilePicture(formData);
        dispatch({ type: UPDATE, payload: data });

        window.location.reload();
    } catch (error) {
        console.log(error.message);
    }
};

export const updateUserProfileData = (user) => async (dispatch) => {
    try {
        const { data } = await api.updateUserProfileData(user);

        dispatch({ type: UPDATE, payload: data });

        // window.location.reload();

        notifySuccess('Modifications enregistrées');

    } catch (error) {
        console.log(error.message);
        notifyError(error.message)
    }
};

export const updateUserPassword = (user) => async (dispatch) => {
    try {
        const { data } = await api.updateUserPassword(user);

        dispatch({ type: UPDATE, payload: data });

    } catch (error) {
        console.log(error.message);
    }
};