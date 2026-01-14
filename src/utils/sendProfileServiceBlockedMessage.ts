import { env } from "../typeDefinitions/default.types";
import config from "../../config/config";

export const generateStringToBeSent = (
  userId: string,
  reason: string,
  env: env
) => {
  const helpGroupRoleId = config(env).PROFILE_SERVICE_HELP_GROUP_ID;
  return `Hello${userId ? ` <@${userId}>` : ""},\n${
    userId ? "Your" : "Someone's"
  } Profile Service is **BLOCKED** because of the below-mentioned reason.${
    userId
      ? ` Please visit the [MAIN SITE](${
          config(env).VERIFICATION_SITE_URL
        }/identity) to fix this.\nIf you have any issue related to profile service, you can tag <@&${helpGroupRoleId}> and ask for help.`
      : ""
  }\n\n**Reason:** \`${reason ? reason : "No reason provided"}\``;
};

export async function sendProfileServiceBlockedMessage(
  userId: string,
  reason: string,
  env: env
): Promise<void> {
  const stringToBeSent = generateStringToBeSent(userId, reason, env);

  const bodyObj = {
    content: stringToBeSent,
  };

  const url = config(env).TRACKING_CHANNEL_URL;

  await fetch(url, {
    method: "POST",
    body: JSON.stringify(bodyObj),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${env.DISCORD_TOKEN}`,
    },
  });
}
