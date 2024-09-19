import { UPDATE } from "../constants/actionTypes";

export const UserProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE:
            localStorage.setItem(
                "profile",
                JSON.stringify({
                    ...JSON.parse(localStorage.getItem("profile")),
                    result: {
                        ...JSON.parse(localStorage.getItem("profile")).result,
                        ...action?.payload,
                    },
                })
            );
            return { ...state, data: action?.payload };
        default:
            return state;
    }
};

export default UserProfileReducer;