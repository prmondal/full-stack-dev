import { MongoClient, ServerApiVersion } from 'mongodb';

const CONNECTION_URI = "mongodb+srv://prmondal:ZAzBLW9slZKHfQ01@cluster0.hhno16r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DB_NAME = "sample_mflix";

export const dbClient = new MongoClient(CONNECTION_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db = undefined;
try {
    await dbClient.connect();
    db = dbClient.db(DB_NAME);
} catch (err) {
    console.error(`Failed to connect MongoDB. [Error]: ${err}`);
}

export default db;