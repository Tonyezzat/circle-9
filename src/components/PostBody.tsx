import type { PostI } from "../interfaces/postI";

export default function PostBody({post}:{post:PostI}) {
  return (
    <>
      {post.body && <p className="mt-4">{post.body}</p>}
        {post.image && (
          <img src={post.image} className={`w-full object-cover mt-2`} alt="" />
        )}
    
    </>
  )
}
