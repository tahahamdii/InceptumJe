import { combineReducers } from "redux";
import customizationReducer from "../store/customizationReducer";

import auth from "./auth";
import userProfile from "./userProfile";
import meetings from "./meetings";
import members from "./members";

export const reducers = combineReducers({
    auth,
    userProfile,
    meetings,
    members,
    customization: customizationReducer
});