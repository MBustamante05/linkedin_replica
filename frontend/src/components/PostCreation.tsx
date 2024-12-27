import { useState } from "react"
import { UserObjProps } from "../Types/User"
import { useMutation, useQueryClient} from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { PostDataProps } from "../Types/Post";
import { Image, Loader } from "lucide-react";

function PostCreation({ user }: UserObjProps) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null | undefined>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { mutate: createPostMutation, isPending } = useMutation({
    mutationFn: async (postData: PostDataProps) => {
      const res = await axiosInstance.post('/posts/create', postData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return res.data;
    },
    onSuccess: () => {
      toast.success('Post created successfully');
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (err:AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || 'Failed to create post');
    }
  });

  const handlePostCreation = async() => {
    try {
      const postData: PostDataProps = { content }
      if(image) postData.image = await readFileAsDataURL(image);

      createPostMutation(postData)
    } catch (error) {
      console.log('Error in handlePostCreation', error)
    }
  }

  const resetForm = () => {
    setContent("");
    setImage(null);
    setImagePreview(null);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file);
    if(file){
      readFileAsDataURL(file).then(result => setImagePreview(result as string));
    } else{
      setImagePreview(null)
    }
  }
  
  const readFileAsDataURL = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  return (
    <div className="bg-secondary rounded-lg shadow mb-4 p-4">
      <div className='flex space-x-3'>
				<img src={user.profilePicture || "/avatar.png"} alt={user.name} className='size-12 rounded-full' />
				<textarea
					placeholder="What's on your mind?"
					className='w-full p-3 rounded-lg bg-base-100 hover:bg-base-200 focus:bg-base-200 focus:outline-none resize-none transition-colors duration-200 min-h-[100px]'
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
			</div>

			{imagePreview && (
				<div className='mt-4'>
					<img src={imagePreview} alt='Selected' className='w-full h-auto rounded-lg' />
				</div>
			)}

			<div className='flex justify-between items-center mt-4'>
				<div className='flex space-x-4'>
					<label className='flex items-center text-info hover:text-info-dark transition-colors duration-200 cursor-pointer'>
						<Image size={20} className='mr-2' />
						<span>Photo</span>
						<input type='file' accept='image/*' className='hidden' onChange={handleImageChange} />
					</label>
				</div>

				<button
					className='bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary-dark transition-colors duration-200'
					onClick={handlePostCreation}
					disabled={isPending}
				>
					{isPending ? <Loader className='size-5 animate-spin' /> : "Share"}
				</button>
			</div>
    </div>
  )
}

export default PostCreation