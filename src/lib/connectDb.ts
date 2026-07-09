import { connect } from "mongoose";

const mongodbUrl = process.env.MONGODB_URL;

if (!mongodbUrl) {
  throw new Error("mongodb url not found");
}

if (!global.mongoose) {
  global.mongoose = {
    conn: null,
    promise: null,
  };
}

const cached = global.mongoose;

const connectDb = async () => {
  if (cached.conn) {
    console.log("connecting from cached conn");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = connect(mongodbUrl).then((c) => c.connection);
  }
  try {
    cached.conn = await cached.promise;
    console.log("connected successfully from new promise");
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
};
export default connectDb;
