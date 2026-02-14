import { STAGING_DISCORD_ROLE_IDS } from "../../../src/constants/discordRoles";
import { INVITE_OPTIONS } from "../../../src/constants/inviteOptions";
import * as response from "../../../src/constants/responses";
import JSONResponse from "../../../src/utils/JsonResponse";
import { generateDiscordLink } from "../../../src/utils/generateDiscordInvite";
import { dummyInviteBody, guildEnv } from "../../fixtures/fixture";

const defaultRoleIds = [
  STAGING_DISCORD_ROLE_IDS.DEVELOPER,
  STAGING_DISCORD_ROLE_IDS.UNVERIFIED,
  STAGING_DISCORD_ROLE_IDS.NEW,
];

describe("generate invite link", () => {
  it("should pass the reason to discord as a X-Audit-Log-Reason header if provided", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(new JSONResponse({})));

    await generateDiscordLink(dummyInviteBody, guildEnv);

    await generateDiscordLink(dummyInviteBody, guildEnv, "This is a reason");

    expect(global.fetch).toHaveBeenCalledWith(
      `https://discord.com/api/v10/channels/${dummyInviteBody.channelId}/invites`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${guildEnv.DISCORD_TOKEN}`,
          "X-Audit-Log-Reason": "This is a reason",
        },
        body: JSON.stringify({
          max_uses: INVITE_OPTIONS.MAX_USE,
          unique: INVITE_OPTIONS.UNIQUE,
          role_ids: defaultRoleIds,
        }),
      }
    );
  });
  test("should return INTERNAL_SERVER_ERROR when response is not ok", async () => {
    const mockResponse = new Response(null, { status: 500 });
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(mockResponse));

    const result = await generateDiscordLink(dummyInviteBody, guildEnv);
    expect(result).toEqual(response.INTERNAL_SERVER_ERROR);
    expect(global.fetch).toHaveBeenCalledWith(
      `https://discord.com/api/v10/channels/${dummyInviteBody.channelId}/invites`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${guildEnv.DISCORD_TOKEN}`,
        },
        body: JSON.stringify({
          max_uses: INVITE_OPTIONS.MAX_USE,
          unique: INVITE_OPTIONS.UNIQUE,
          role_ids: defaultRoleIds,
        }),
      }
    );
  });

  test("should return JSON response when response is ok", async () => {
    const mockResponse = {};
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(mockResponse))
      );

    const result = await generateDiscordLink(dummyInviteBody, guildEnv);
    expect(result).toEqual({ data: {}, message: response.INVITED_CREATED });
    expect(global.fetch).toHaveBeenCalledWith(
      `https://discord.com/api/v10/channels/${dummyInviteBody.channelId}/invites`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${guildEnv.DISCORD_TOKEN}`,
        },
        body: JSON.stringify({
          max_uses: INVITE_OPTIONS.MAX_USE,
          unique: INVITE_OPTIONS.UNIQUE,
          role_ids: defaultRoleIds,
        }),
      }
    );
  });

  test("should include three role_ids when role is passed (staging)", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(new JSONResponse({})));

    await generateDiscordLink(
      { ...dummyInviteBody, role: "developer" },
      guildEnv
    );

    expect(global.fetch).toHaveBeenCalledWith(
      `https://discord.com/api/v10/channels/${dummyInviteBody.channelId}/invites`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${guildEnv.DISCORD_TOKEN}`,
        },
        body: JSON.stringify({
          max_uses: INVITE_OPTIONS.MAX_USE,
          unique: INVITE_OPTIONS.UNIQUE,
          role_ids: [
            STAGING_DISCORD_ROLE_IDS.DEVELOPER,
            STAGING_DISCORD_ROLE_IDS.UNVERIFIED,
            STAGING_DISCORD_ROLE_IDS.NEW,
          ],
        }),
      }
    );
  });

  test("should return BAD_REQUEST when role is invalid or unknown", async () => {
    const result = await generateDiscordLink(
      { ...dummyInviteBody, role: "unknown_role" },
      guildEnv
    );
    expect(result).toEqual(response.BAD_REQUEST);
  });

  test("should return BAD_REQUEST when role is empty", async () => {
    const result = await generateDiscordLink(
      { ...dummyInviteBody, role: "" },
      guildEnv
    );
    expect(result).toEqual(response.BAD_REQUEST);
  });
});
