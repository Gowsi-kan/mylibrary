import { Client as WorkFlowClient } from "@upstash/workflow";
import config from "./config";
import { Client as QStashClient, resend } from "@upstash/qstash";

export const workflowClient = new WorkFlowClient({
  baseUrl: config.upstash.qstashUrl,
  token: config.upstash.qstashToken,
});

const qStashClient = new QStashClient({ token: config.upstash.qstashToken });

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  await qStashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: config.resend.resendToken }),
    },
    body: {
      from: "Gowsikan <mylibrary.gowsik.life>",
      to: [email],
      subject: subject,
      html: message,
    },
  });
};
