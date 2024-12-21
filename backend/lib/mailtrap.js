import { MailtrapClient } from "mailtrap";
import { MAILTRAP_TOKEN, EMAIL_FROM, EMAIL_FROM_NAME } from "../../config.js";

const TOKEN = MAILTRAP_TOKEN;

export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: EMAIL_FROM,
  name: EMAIL_FROM_NAME,
};
