import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { UserProps } from "../Types/User";
import { axiosInstance } from "../lib/axios";
import ProfileHeader from "../components/ProfileHeader";
import AboutSection from "../components/AboutSection";
import ExperienceSection from "../components/ExperienceSection";
import EducationSection from "../components/EducationSection";
import SkillsSection from "../components/SkillsSection";
import toast from "react-hot-toast";

function ProfilePage() {
  const { username } = useParams();
  const queryClient = useQueryClient();
  const { data: authUser, isLoading } = useQuery<UserProps>({
    queryKey: ["authUser"],
  });

  const { data: userProfile, isLoading: isUserProfileLoading } = useQuery({
    queryKey: ["userProfile", username],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${username}`);
      return res.data;
    },
  });

  const { mutate: updateProfile } = useMutation({
    mutationFn: async (data: UserProps) => {
      const res = await axiosInstance.put("/users/profile", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile", username] });
    }
  });

  if(isLoading || isUserProfileLoading) return null;

  const isOwnProfile = authUser?.username === userProfile.username;
  const userData = isOwnProfile ? authUser : userProfile;

  const handleSave = (updatedData: UserProps) => {
    console.log(updatedData)
    updateProfile(updatedData);
  }
  return (
    <div className="max-w-4xl mx-auto p-4">
      <ProfileHeader userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave}/>
      <AboutSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave}/>
      <ExperienceSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave}/>
      <EducationSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave}/>
      <SkillsSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave}/>

    </div>
  )
}

export default ProfilePage