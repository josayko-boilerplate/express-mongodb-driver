import { ObjectId } from "bson";
import { connectToDb } from "./server";

export interface IPost {
  _id: ObjectId;
  title: string;
  content: string;
  author: string;
  createAt: Date;
  updatedAt: Date;
}

export async function createPost(post: IPost): Promise<string> {
  const client = await connectToDb();
  const postsCollection = client.db("blog").collection("posts");

  // Validate the post data
  if (!post.title || !post.content || !post.author) {
    throw new Error("Missing required fields");
  }

  // Set createdAt and updatedAt fields
  const now = new Date();
  post.createAt = now;
  post.updatedAt = now;

  // Insert the post into the database
  const { insertedId } = await postsCollection.insertOne(post);

  // Close the database connection
  client.close();

  return insertedId.toString();
}
