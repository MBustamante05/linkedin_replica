import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ConnectionRequestProps } from "../Types/ConnectionRequest";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { Link } from "react-router-dom";

type FriendRequestProps = {
  request: ConnectionRequestProps;
};
function FriendRequest({ request }: FriendRequestProps) {
  const queryClient = useQueryClient();

  const { mutate: acceptConnectionRequest } = useMutation({
    mutationFn: (userId: string) =>
      axiosInstance.put(`/connections/accept/${userId}`),
    onSuccess: () => {
      toast.success("Connection request accepted succesfully!");
      queryClient.invalidateQueries({
        queryKey: ["connectionRequests"],
      });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "Failed to accept request");
    },
  });

  const { mutate: rejectConnectionRequest } = useMutation({
    mutationFn: (userId: string) =>
      axiosInstance.put(`/connections/reject/${userId}`),
    onSuccess: () => {
      toast.success("Connection request rejected");
      queryClient.invalidateQueries({
        queryKey: ["connectionRequests"],
      });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "Failed to reject request");
    },
  });
  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between transition-all hover:shadow-md">
      <div className="flex items-center gap-4">
        <Link to={`/profile/${request.sender.username}`}>
          <img
            src={request.sender.profilePicture || "/avatar.png"}
            alt={request.sender.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        </Link>
        <div>
          <Link
            to={`/profile/${request.sender.username}`}
            className="font-semibold text-lg"
          >
            {request.sender.name}
          </Link>
          <p className="text-gray-600">{request.sender.headline}</p>
        </div>
      </div>
      <div className="space-x-2">
      <button
					className='bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors'
					onClick={() => acceptConnectionRequest(request._id)}
				>
					Accept
				</button>
				<button
					className='bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors'
					onClick={() => rejectConnectionRequest(request._id)}
				>
					Reject
				</button>
      </div>
    </div>
  );
}

export default FriendRequest;
