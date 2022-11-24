import mongoose, { ConnectionOptions } from 'mongoose';
import dotenv from 'dotenv';

mongoose.Promise = global.Promise;
dotenv.config();

const { MongoURL } = process.env;

const connectToDatabase = async (): Promise<void> => {
  const options: ConnectionOptions = { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true };

  await mongoose.connect( <string>MongoURL, options);
};

export { connectToDatabase };
