export type IMailOptions = {
  from: { name: string; address: string };
  to: string;
  cc: string[];
  bcc: string[];
  subject: string;
  html: string;
};
