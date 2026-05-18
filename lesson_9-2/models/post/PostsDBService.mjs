import Post from "./Post.mjs";
import MongooseCRUDManager from "../MongooseCRUDManager.mjs";

class PostsDBService extends MongooseCRUDManager {
  async getList(filters = {}) {
    try {
      return await Post.find(filters)
        .populate("authors")
        .populate("comments.commenter");
    } catch (error) {
      return [];
    }
  }

  async getById(id) {
    try {
      return await Post.findById(id)
        .populate("authors")
        .populate("comments.commenter");
    } catch (error) {
      return null;
    }
  }
}

export default new PostsDBService(Post);
