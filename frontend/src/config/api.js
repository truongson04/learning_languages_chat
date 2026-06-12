import client from "./axios.js";

export const signup = async (signupData) => {
  const res = await client.post("/auth/signup", signupData);
  return res.data;
};
export const getAuthUser = async (params) => {
  try {
    const res = await client.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const onboarding = async (userData) => {
  const res = await client.post("/auth/onboarding", userData);
  return res.data;
};
export const login = async (userData) => {
  const res = await client.post("/auth/login", userData);
  return res.data;
};
export const logout = async (params) => {
  const res = await client.post("/auth/logout");
  return res.data;
};
export const getFriends = async (params) => {
  const res = await client.get("/user/friends ");
  return res.data;
};
export const getRecommendedFriends = async (params) => {
  const res = await client.get("/user/");
  return res.data;
};
export const getOutGoingRequests = async (params) => {
  const res = await client.get("/user/sent-request");
  return res.data;
};
export const sendFriendRequest = async (userId) => {
  const res = await client.post(`/user/friend-request/${userId}`);
  return res.data;
};
