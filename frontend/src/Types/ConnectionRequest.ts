import { UserProps } from "./User";

export type ConnectionRequestProps = {
  _id: string;
  sender: UserProps;
  recipient: UserProps;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
}