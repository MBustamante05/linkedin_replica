import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import SideBar from "../components/SideBar";
import { UserProps } from "../Types/User";
import PostCreation from "../components/PostCreation";

function HomePage() {
  const { data: authUser } = useQuery<UserProps>({
    queryKey: ["authUser"],
  });
  const { data: recommendedUsers } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/suggestions");
      return res.data;
    },
  });

  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/posts");
      return res.data;
    },
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="hidden lg:block lg:col-span-1">
        {authUser && <SideBar user={authUser} />}
      </div>
      <div className='col-span-1 lg:col-span-2 order-first lg:order-none'>
        { authUser && <PostCreation user={authUser}/>} 
      </div>
    </div>
  );
}

export default HomePage;
