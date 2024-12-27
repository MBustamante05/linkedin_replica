import { PostModelProps } from "./Post";
import { UserProps } from "./User";

export type NotificationProps = {
  _id: string;
  recipient: string;
  type: 'like' | 'comment' | 'connectionAccepted' | null;
  relatedUser: UserProps;
  relatedPost: PostModelProps;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}