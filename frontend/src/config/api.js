import client from "./axios.js";

export const signup = async (signupData) => {
  const res = await client.post("/auth/signup", signupData);
  return res.data;
};
