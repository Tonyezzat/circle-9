import axios from "axios";
import type { promises } from "dns";
import type { GetPostResponse } from "../types/response";



class postServices{


async  getAllPosts() :promises<GetPostResponse>{
    
    const {data}=await axios.get("https://route-posts.routemisr.com/posts", {
        headers:{
            token:localStorage.getItem("token")
        }
    })

    return data;
}

async createPost(formData:FormData){
    const {data}=await axios.post("https://route-posts.routemisr.com/posts",formData,{
        headers:{
            token:localStorage.getItem("token")
        }
    })
return data;
}
async deletePost(postId:string){
const {data}=await axios.delete("https://route-posts.routemisr.com/posts/"+postId,{
    headers:{
        token:localStorage.getItem("token")
    }
})
    return data;
}

async  getPostDetails(postId:string) {

    const {data}=await axios.get("https://route-posts.routemisr.com/posts/"+postId,{
        headers:{
            token:localStorage.getItem("token")
        }
    })
    return data;
}   

}

const postservice=new postServices();
export default postservice

