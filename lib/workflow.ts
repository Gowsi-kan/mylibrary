import { Client as WorkFlowClient } from "@upstash/workflow";
import config from "./config";

export const workflowClient = new WorkFlowClient({
  baseUrl: config.upstash.qstashUrl,
  token: config.upstash.qstashToken,
});
