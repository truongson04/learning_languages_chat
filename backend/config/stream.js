import { StreamChat } from "stream-chat";
import dotenv from "dotenv";
dotenv.config();
const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;
const streamClient = StreamChat.getInstance(apiKey, apiSecret);
export const upsertStreamUser = async function (userData) {
  try {
    await streamClient.upsertUser(userData);
    return userData;
  } catch (error) {
    console.log(error);
  }
};
export const genStreamToken = async function name(userId) {};
