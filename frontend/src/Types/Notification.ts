export type NotificationProps = {
  _id: string;
  recipient: string;
  type: string;
  relatedUser: string;
  relatedPost: string;
  read: boolean;
}