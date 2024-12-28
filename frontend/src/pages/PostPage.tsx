import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import { axiosInstance } from "../lib/axios";
import SideBar from "../components/SideBar";
import Post from "../components/Post";
import { UserProps } from "../Types/User";

function PostPage() {
  const { postId } = useParams();
  const { data: authUser } = useQuery<UserProps>({ queryKey: ["authUser"]});

  const { data: post, isLoading: postLoading } = useQuery({
    queryKey: ["post", postId],
    queryFn: async() => {
      const res = await axiosInstance.get(`/posts/${postId}`);
      return res.data;
    }
  });

  if(postLoading) return <div>Loading post...</div>
  if(!post) return <div>Post not found</div>

  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
			<div className='hidden lg:block lg:col-span-1'>
				{ authUser && <SideBar user={authUser} /> }
			</div>

			<div className='col-span-1 lg:col-span-3'>
				<Post post={post} />
			</div>
		</div>
  )
}

export default PostPage