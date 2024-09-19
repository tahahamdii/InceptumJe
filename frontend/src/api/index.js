import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });
API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }

    return req;
});

export const addMember = (formData) => API.post("/rh/members/addMember", formData);
export const signIn = (formData) => API.post("/members/signIn", formData);
export const updateUserProfilePicture = (updatedUserProfilePicture) => API.patch("/profile/updateUserProfilePicture", updatedUserProfilePicture);
export const updateUserProfileData = (updatedUserProfileData) => API.post("/profile/updateUserProfileData", updatedUserProfileData);
export const updateUserPassword = (updatedUserPassword) => API.post("/profile/updateUserPassword", updatedUserPassword);
export const fetchMeetings = () => API.get('/sg/meetings');
export const fetchMeetingById = (id) => API.get(`/sg/meetings/${id}`);
export const createMeeting = (newMeeting) => API.post('/sg/meetings/createMeeting', newMeeting);
export const updateMeeting = (id, updatedMeeting) => API.patch(`/sg/meetings/updateMeeting/${id}`, updatedMeeting);
export const deleteMeeting = (id) => API.delete(`/sg/meetings/deleteMeeting/${id}`);
export const fetchAllMembers = () => API.get("/rh/members/getAllMembers");