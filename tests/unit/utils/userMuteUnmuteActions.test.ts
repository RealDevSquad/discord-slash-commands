import { DISCORD_BASE_URL } from "../../../src/constants/urls";
import { muteUser, unmuteUser } from "../../../src/utils/userMuteUnmuteActions";
import fetchMock from "jest-fetch-mock";
jest.mock("node-fetch", () => fetchMock);
const mockEnv = {
  DISCORD_BASE_URL: DISCORD_BASE_URL,
  DISCORD_TOKEN: "mockToken",
};

describe("User Mute and Unmute Actions", () => {
  let userId: string;
  let guildId: string;

  beforeEach(() => {
    userId = "123456789";
    guildId = "987654321";
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const assertFetchCall = (url: string, bodyObj: any) => {
    expect(fetch).toHaveBeenCalledWith(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${mockEnv.DISCORD_TOKEN}`,
      },
      body: JSON.stringify(bodyObj),
    });
  };

  it("should mute a user successfully", async () => {
    const url = `${mockEnv.DISCORD_BASE_URL}/guilds/${guildId}/members/${userId}`;
    const bodyObj = {
      mute: true,
      channel_id: null,
    };

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(new Response()));

    await muteUser(userId, guildId, mockEnv.DISCORD_TOKEN);

    assertFetchCall(url, bodyObj);
  });

  it("should handle errors when muting a user", async () => {
    const url = `${mockEnv.DISCORD_BASE_URL}/guilds/${guildId}/members/${userId}`;

    jest
      .spyOn(global, "fetch")
      .mockRejectedValueOnce(new Error("Failed to mute user"));

    await expect(
      muteUser(userId, guildId, mockEnv.DISCORD_TOKEN)
    ).rejects.toThrowError("Failed to mute user");

    expect(fetch).toHaveBeenCalledWith(url, expect.any(Object));
  });

  it("should unmute a user successfully", async () => {
    const url = `${mockEnv.DISCORD_BASE_URL}/guilds/${guildId}/members/${userId}`;
    const bodyObj = {
      mute: false,
      channel_id: null,
    };

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(new Response()));

    await unmuteUser(userId, guildId, mockEnv.DISCORD_TOKEN);

    assertFetchCall(url, bodyObj);
  });

  it("should handle errors when unmuting a user", async () => {
    const url = `${mockEnv.DISCORD_BASE_URL}/guilds/${guildId}/members/${userId}`;

    jest
      .spyOn(global, "fetch")
      .mockRejectedValueOnce(new Error("Failed to unmute user"));

    await expect(
      unmuteUser(userId, guildId, mockEnv.DISCORD_TOKEN)
    ).rejects.toThrowError("Failed to unmute user");

    expect(fetch).toHaveBeenCalledWith(url, expect.any(Object));
  });
});
