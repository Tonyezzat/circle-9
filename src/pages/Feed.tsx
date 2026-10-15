import { useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import type { PostI } from "../interfaces/postI";
import commentServices from "../services/commentService";
import postservice from "../services/postServices";

export default function Feed() {
  const [posts, setposts] = useState<PostI[]>([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  async function getAllPosts(){
    const { data } = await postservice.getAllPosts();
    setposts(data.posts);
  }

  async function deletePost(postId: string) {
    const response = await postservice.deletePost(postId);
    console.log(response);
    getAllPosts();
  }

  async function createComment(postId: string, formData: FormData) {
    const response = await commentServices.createComment(postId, formData);
    getAllPosts();
    return response;
  }
  async function deleteComment(postId: string, commentId:string) {
    const response = await commentServices.deleteComment(postId, commentId);
    getAllPosts();
    return response;
  }

  return (
    <>
      <div className="container max-w-3xl mx-auto overflow-hidden ">
        <CreatePost getAllPosts={getAllPosts} deletePost={deletePost} />

        <div className="my-20">
          <div className="grid gap-4">
            {posts.map((post) => (
              <Post
                post={post}
                deletePost={deletePost}
                createComment={createComment}
                deleteComment={deleteComment}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
