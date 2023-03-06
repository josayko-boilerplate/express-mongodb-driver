import express from "express";
import { MongoClient } from "mongodb";
import { createPost, IPost } from "./post";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const connectToDb = async () => {
  return await MongoClient.connect("mongodb://localhost:27017");
};

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/createpost", async (req, res) => {
  const newPost: IPost = req.body as IPost;
  console.log("payload: ", newPost);

  try {
    const postId = await createPost(newPost);
    res.send({ status: "ok", code: 200, details: { id: postId } });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).send({ status: "error", code: 400, details: err });
    }
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));

export { connectToDb };
