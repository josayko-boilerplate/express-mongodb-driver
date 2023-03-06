import { ObjectId } from "bson";
import { PostSchema } from "./schema";
import { connectToDb } from "./server";

export interface IPost {
  _id: ObjectId;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function createPost(post: IPost): Promise<string> {
  const client = await connectToDb();
  await client.db("blog").command({
    collMod: "posts",
    validator: {
      $jsonSchema: PostSchema,
    },
  });

  const postsCollection = client.db("blog").collection("posts");

  // Validate the post data
  if (!post.title || !post.content || !post.author) {
    throw new Error("Missing required fields");
  }

  // Set createdAt and updatedAt fields
  const now = new Date();
  post.createdAt = now;
  post.updatedAt = now;

  // Insert the post into the database
  const { insertedId } = await postsCollection.insertOne(post);

  // Close the database connection
  client.close();

  return insertedId.toString();
}
