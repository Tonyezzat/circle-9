import { Button, Input } from "@heroui/react";
import type { PostI } from "../interfaces/postI";
import Comment from "./Comment";
import PostActions from "./PostActions";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import { useState } from "react";

export default function Post({
  post,
  deletePost,
  createComment,
  deleteComment,
}: {
  post: PostI;
  deletePost: any;
  createComment:any;
  deleteComment:any
}) {
const [commentContent, setcommentContent] = useState("")
const [IsLoading, setIsLoading] = useState(false)


async function handleCreateComments() {
setIsLoading(true)
const formData=new FormData();
formData.set("content",commentContent)
const response=await createComment(post._id,formData)

console.log(response);
setIsLoading(false)
setcommentContent("")
  
}


  return (
    <>
      <div className="bg-white max-w-3xl  rounded-md  shadow-md h-auto py-3 px-3 my-5">
        {/* Post header */}
        <PostHeader post={post} deletePost={deletePost} />
        {/* Post body */}
        <PostBody post={post} />

        {/* post Footer */}
        <PostFooter post={post} />

        {/* Post actions */}
        <PostActions post={post} />

        {/* Create Comments */}
        <div className="flex relative">
          <Input
            value={commentContent}
            onChange={(e)=>{setcommentContent(e.target.value)}}
            className="pe-30"
            placeholder="comment...."
          />
          <Button
          isLoading={IsLoading}
          onPress={handleCreateComments}
            color="primary"
            className="absolute top-0 bottom-0 inset-e-0"
          >
            Comment
          </Button>
        </div>

        {post.topComment && <Comment comment={post.topComment} deleteComment={deleteComment} />}
      </div>
    </>
  );
}
