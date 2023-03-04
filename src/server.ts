import express from "express";
import { MongoClient } from "mongodb";
import { createPost, IPost } from "./post";

const app = express();

const connectToDb = async () => {
  return await MongoClient.connect("mongodb://localhost:27017");
};

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/createpost", async (req, res) => {
  const newPost: IPost = {
    title: "My First Post",
    content: "This is the content of my first post.",
    author: "John Doe",
  } as IPost;

  try {
    const postId = await createPost(newPost);
    res.send({ status: "ok", code: 200, details: { id: postId } });
  } catch (err: any) {
    res.status(400).send({ status: "error", code: 400, details: err });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));

export { connectToDb };
