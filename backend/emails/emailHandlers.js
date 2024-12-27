import { mailtrapClient, sender } from "../lib/mailtrap.js";
import {
  createCommentNotificationEmailTemplate,
  createConnectionAcceptedEmailTemplate,
  createWelcomeEmailTemplate,
} from "./emailTemplates.js";
export const sendWelcomeEmail = async (email, name, profileUrl) => {
  const recipients = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipients,
      subject: `Welcome to LinkHub, ${name}!`,
      html: createWelcomeEmailTemplate(name, profileUrl),
      category: "welcome",
    });
    console.log(`Welcome Email sent successfully`, response);
  } catch (error) {
    throw error;
  }
};

export const sendCommentNotificationEmail = async (
  email,
  name,
  commenterName,
  postUrl,
  commentContent
) => {
  const recipients = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipients,
      subject: "New Comment on Your Post",
      html: createCommentNotificationEmailTemplate(
        name,
        commenterName,
        postUrl,
        commentContent
      ),
      category: "comment_notification",
    });

    console.log(`Comment Notification Email sent successfully`, response);
  } catch (error) {
    throw error;
  }
};

export const sendConnectionAcceptedEmail = async (
  senderEmail,
  senderName,
  recipientName,
  profileUrl
) => {
  const recipients = [{ senderEmail }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipients,
      subject: `${recipientName} accepted your connection request`,
      html: createConnectionAcceptedEmailTemplate(
        senderName,
        recipientName,
        profileUrl
      ),
      category: "connection_accepted",
    });
  } catch (error) {
    console.error("Error in sendConnectionRequestEmail: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};
