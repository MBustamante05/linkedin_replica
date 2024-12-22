type Experience = {
  title: string;
  company: string;
  startDate: Date;
  endDate: Date;
  description: string;
}
type Education = {
  school: string;
  degree: string;
  startYear: Date;
  endYear: Date;
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
  educations: Education[];
  connections: string[];
}
export type UserObjProps = {
  user: UserProps
}