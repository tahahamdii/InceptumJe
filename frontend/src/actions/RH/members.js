import { AUTHERROR, CREATE, FETCH_ALL_MEMBERS } from '../../constants/actionTypes';
import * as api from '../../api/index.js';

export const getAllMembers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchAllMembers();

        dispatch({ type: FETCH_ALL_MEMBERS, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const addMember = (member) => async (dispatch) => {
    try {

        const { data } = await api.addMember(member);

        dispatch({ type: CREATE, payload: data?.result });

        dispatch(authError(""));

    } catch (error) {
        dispatch(authError(error.response.data.message));
    }
};

// export const updateMember = (id, member) => async (dispatch) => {
//     try {
//         const { data } = await api.updateMember(id, member);

//         dispatch({ type: UPDATE, payload: data });
//     } catch (error) {
//         console.log(error.message);
//     }
// };

// export const deleteMember = (id) => async (dispatch) => {
//     try {
//         await api.deleteMember(id);

//         dispatch({ type: DELETE, payload: id });
//     } catch (error) {
//         console.log(error.message);
//     }
// };

export const authError = (error) => async (dispatch) => {
    dispatch({
        type: AUTHERROR,
        payload: error,
    });
};