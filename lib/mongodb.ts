import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {
  tls: true, // 👈 required for Atlas
};

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

const client = new MongoClient(uri, options);
const clientPromise = client.connect();

export default clientPromise;
