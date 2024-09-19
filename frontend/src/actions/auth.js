import { AUTH, AUTHERROR } from "../constants/actionTypes";
import * as api from '../api/index.js';

export const signin = (formData) => async (dispatch) => {
    try {

        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        window.location.reload();

        dispatch(authError(""));

    } catch (error) {
        dispatch(authError(error.response.data.message));
    }
};

export const authError = (error) => async (dispatch) => {
    dispatch({
        type: AUTHERROR,
        payload: error,
    });
};