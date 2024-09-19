import { FETCH_ALL_MEETINGS, DELETE, CREATE, UPDATE, FETCH_MEETING } from "../constants/actionTypes";

export const MeetingReducer = (meetings = [], action) => {
    switch (action.type) {
        case FETCH_ALL_MEETINGS:
            return action.payload;
        case FETCH_MEETING:
            return { ...meetings, meeting: action.payload.meeting };
        case CREATE:
            return [...meetings, action.payload];
        case UPDATE:
            return meetings?.map((meeting) => (meeting._id === action.payload._id ? action.payload : meeting));
        case DELETE:
            return meetings.filter((meeting) => meeting._id !== action.payload);
        default:
            return meetings;
    }
};

export default MeetingReducer;