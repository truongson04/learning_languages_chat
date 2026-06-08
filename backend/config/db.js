import mongoose from "mongoose";
export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "learning_web",
    });
    console.log("Connect to db successfully !!");
  } catch (error) {
    console.log(error);
  }
};
