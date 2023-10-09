import mongoose from "mongoose";

const DbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log(` connected to db`))

    .catch((error) => {
      console.log(error);
    });
};

export default DbConnect;
