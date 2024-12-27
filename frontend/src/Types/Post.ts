import { UserProps } from "./User";

export type PostDataProps = {
  content: string;
  image?: File | null | unknown;
}
type UserCommentProps = {
  _id: string;
  name: string;
  profilePicture: string;
}
export type Comment = {
  _id?: string;
  content: string;
  user: UserCommentProps;
  createdAt: Date;
}

export type PostModelProps = {
  _id: string;
  author: UserProps;
  content: string;
  image: string;
  likes: string[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}
