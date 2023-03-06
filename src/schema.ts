export const PostSchema = {
  bsonType: "object",
  description: "Document describing a post",
  required: ["_id", "title", "content", "author"],
  properties: {
    _id: {
      bsonType: "objectId",
    },
    title: {
      bsonType: "string",
      description: "title must be a string and is required",
    },
    content: {
      bsonType: "string",
      description: "content must be a string and is required",
    },
    author: {
      bsonType: "string",
      description: "author must be a string and is required",
    },
    createdAt: {
      bsonType: "date",
      description: "createdAt must be a date and is required",
    },
    updatedAt: {
      bsonType: "date",
      description: "updatedAt must be a date and is required",
    },
  },
  additionalProperties: false,
};
