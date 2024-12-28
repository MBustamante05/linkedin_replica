export interface Experience {
  _id?: string;
  title: string;
  company: string;
  startDate?: string;
  endDate?: string;
  description: string;
  currentlyWorking?: boolean;
}
export interface Education {
  _id?: string;
  school: string;
  degree: string;
  startYear?: string;
  endYear?: string;
}
export type UserProps = {
  _id: string;
  name: string;
  username: string;
  headline: string;
  profilePicture: string;
  bannerImg: string;
  location: string;
  about: string;
  skills: string[];
  experiences: Experience[];
  education: Education[];
  connections: UserProps[];
}
export type UserObjProps = {
  user: UserProps
}