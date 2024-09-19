import * as api from '../../api/index.js';
import { CREATE, DELETE, FETCH_ALL_MEETINGS, FETCH_MEETING, UPDATE } from '../../constants/actionTypes.js';
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

export const getMeetings = () => async (dispatch) => {
    try {
        const { data } = await api.fetchMeetings();

        dispatch({ type: FETCH_ALL_MEETINGS, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const getMeetingById = (id) => async (dispatch) => {
    try {
        //   dispatch({ type: START_LOADING });

        const { data } = await api.fetchMeetingById(id);

        dispatch({ type: FETCH_MEETING, payload: { meeting: data } });
    } catch (error) {
        console.log(error);
    }
};

export const createMeeting = (meeting) => async (dispatch) => {
    try {
        const { data } = await api.createMeeting(meeting);

        dispatch({ type: CREATE, payload: data });

        notifySuccess('Réunion créée');
        // window.location.reload();
    } catch (error) {
        console.log(error);
        notifyError(error.message);
    }
};

export const updateMeeting = (id, meeting) => async (dispatch) => {
    try {
        const { data } = await api.updateMeeting(id, meeting);

        dispatch({ type: UPDATE, payload: data });

        notifySuccess('Réunion modifiée');
    } catch (error) {
        console.log(error);
        notifyError(error.message);
    }
};

export const deleteMeeting = (id) => async (dispatch) => {
    try {
        await await api.deleteMeeting(id);

        dispatch({ type: DELETE, payload: id });

        // notifySuccess('Réunion supprimée');
        // window.location.reload();
    } catch (error) {
        console.log(error);
        // notifyError(error.message);
    }
};
