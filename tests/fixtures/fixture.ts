import { IRequest } from "itty-router";
import {
  createNewRole,
  discordMessageRequest,
  memberGroupRole,
} from "../../src/typeDefinitions/discordMessage.types";
import { InteractionType } from "discord-interactions";
import { UserBackend } from "../../src/typeDefinitions/userBackend.types";
import { TaskOverdueResponse } from "../../src/typeDefinitions/taskOverdue.types";
import { UserStatus } from "../../src/typeDefinitions/userStatus.type";
import { SUPER_USER_ONE } from "../../src/constants/variables";

export const dummyHelloMessage: discordMessageRequest = {
  type: InteractionType.APPLICATION_COMMAND,
  data: {
    name: "Hello",
  },
  member: {
    user: {
      id: 123456,
      username: "ritik",
      avatar: "d1eaa8f8ab5e8235e08e659aef5dfeac",
      discriminator: "1234",
    },
    joined_at: "2021-07-25T19:25:16.172000+00:00",
  },
  guild_id: 123456,

  guild: undefined,

  channel_id: 123456,
};

export const dummyVerifyMessage: discordMessageRequest = {
  type: InteractionType.APPLICATION_COMMAND,
  data: {
    name: "VERIFY",
  },
  member: {
    user: {
      id: 123456,
      username: "ritik",
      avatar: "d1eaa8f8ab5e8235e08e659aef5dfeac",
      discriminator: "1234",
    },
    joined_at: "2021-07-25T19:25:16.172000+00:00",
  },
  guild_id: 123456,

  guild: undefined,

  channel_id: 123456,
};

export const dummyCreateBody: createNewRole = {
  rolename: "test role",
  mentionable: true,
};

export const dummyAddRoleBody: memberGroupRole = {
  userid: "abcd1234",
  roleid: "defg5678",
};

export const guildEnv = {
  DISCORD_GUILD_ID: "1234",
  DISCORD_TOKEN: "abcd",
  CRON_JOBS_PUBLIC_KEY: "test",
};

export const dummyInviteBody = {
  channelId: "1234",
  role: "developer",
};

export const dummyGuildMemberDetails = {
  avatar: null,
  communication_disabled_until: null,
  flags: 0,
  joined_at: "2023-04-01T01:00:09.204000+00:00",
  nick: null,
  pending: false,
  premium_since: null,
  roles: [],
  user: {
    id: "12345678",
    username: "John Doe",
    avatar: "123abc123xyz",
    discriminator: "6818",
    public_flags: 64,
    flags: 64,
    banner: null,
    accent_color: 16721920,
    global_name: null,
    avatar_decoration: null,
    display_name: null,
    banner_color: "#ff2800",
  },
  mute: false,
  deaf: false,
};

export const transformedArgument = {
  roleToBeTaggedObj: {
    name: "role",
    type: 8,
    value: "1118201414078976192",
  },
  displayMessageObj: { name: "message", type: 3, value: "hello" },
  channelId: 1244,
};

export const onlyRoleToBeTagged = {
  roleToBeTaggedObj: {
    name: "role",
    type: 8,
    value: "1118201414078976192",
  },
  channelId: 1244,
  dev: {
    name: "dev",
    type: 4,
    value: false,
  },
};

export const ctx = {
  /* eslint-disable @typescript-eslint/no-empty-function */
  waitUntil: (promise: void | Promise<void>): void => {},
  passThroughOnException: (): void => {},
  props: {},
};
export const generateDummyRequestObject = ({
  url,
  method,
  params,
  query,
  headers, // Object of key value pair
  json,
}: Partial<IRequest>): IRequest => {
  return {
    method: method ?? "GET",
    url: url ?? "/roles",
    params: params ?? {},
    query: query ?? {},
    headers: new Map(Object.entries(headers ?? {})),
    json: json,
  };
};

export const rolesMock = [
  {
    id: "1234567889",
    name: "@everyone",
    permissions: "",
    position: 2,
    color: 2,
    hoist: true,
    managed: true,
    mentionable: true,
  },
  {
    id: "12344567",
    name: "bot one",
    permissions: "",
    position: 2,
    color: 2,
    hoist: true,
    managed: true,
    mentionable: true,
  },
];
export const mockDateNow = 1626512345678;
export const UNIQUE_TOKEN = "UNIQUE_TOKEN";
export const env = {
  BOT_PUBLIC_KEY: "BOT_PUBLIC_KEY",
  DISCORD_GUILD_ID: "DISCORD_GUILD_ID",
  DISCORD_TOKEN: "SIGNED_JWT",
};

export const discordUserData = {
  type: "discord",
  token: UNIQUE_TOKEN,
  attributes: {
    discordId: 1,
    userAvatar: "https://cdn.discordapp.com/avatars/1/userAvatarHash.jpg",
    userName: "userName",
    discriminator: "discriminator",
    discordJoinedAt: "2021-07-25T19:25:16.172000+00:00",
    expiry: mockDateNow + 1000 * 60 * 2,
  },
};

export const mockMessageResponse = {
  id: "1215369965792665620",
  type: 0,
  content: "<@849364584674492426>",
  channel_id: "868936963456126991",
  author: {
    id: "1205843978088620144",
    username: "Joy Bot",
    avatar: null,
    discriminator: "7363",
    public_flags: 524288,
    premium_type: 0,
    flags: 524288,
    bot: true,
    banner: null,
    accent_color: null,
    global_name: null,
    avatar_decoration_data: null,
    banner_color: null,
  },
  attachments: [],
  embeds: [],
  mentions: [
    {
      id: "849364584674492426",
      username: "Aniket",
      avatar: null,
      discriminator: "1514",
      public_flags: 0,
      premium_type: 0,
      flags: 0,
      banner: null,
      accent_color: null,
      global_name: null,
      avatar_decoration_data: null,
      banner_color: null,
    },
  ],
  mention_roles: [],
  pinned: false,
  mention_everyone: false,
  tts: false,
  timestamp: "2024-03-07T18:46:20.327000+00:00",
  edited_timestamp: null,
  flags: 0,
  components: [],
  referenced_message: null,
};

export const userBackendMock: UserBackend = {
  message: "User returned successfully",
  user: {
    id: "1234567",
    username: "fmk",
    first_name: "f",
    last_name: "mk",
    discordId: "12345",
    github_display_name: "fmk",
    github_id: "fmk23",
    isMember: false,
  },
};

export const userStatusMock: UserStatus = {
  id: "someId",
  userId: "someUserId",
  data: {
    userId: "someUserId",
    currentStatus: {
      state: "OOO",
      updatedAt: 1691398400000,
      from: 1691398400000,
      until: 1691484800000,
      message: "Out of office message for today",
    },
    monthlyHours: {
      committed: 40,
      updatedAt: 1690956800000,
    },
  },
  message: "User Status found successfully.",
};

export const userFutureStatusMock: UserStatus = {
  id: "someId",
  userId: "someUserId",
  data: {
    userId: "someUserId",
    currentStatus: {
      state: "ACTIVE",
      updatedAt: 1691398400000,
      from: 1691398400000,
      until: 1691484800000,
      message: "Out of office message for today",
    },
    futureStatus: {
      state: "OOO",
      updatedAt: 1691030400000,
      from: 1691030400000,
      until: 1691116800000,
      message: "Upcoming out of office message",
    },
    monthlyHours: {
      committed: 40,
      updatedAt: 1690956800000,
    },
  },
  message: "User Status found successfully.",
};

export const messageRequestMemberMockNonSuperUser = {
  member: {
    user: {
      id: 123455,
      username: "ankush",
      avatar: "https://cdn.discordapp.com/avatars/1/userAvatarHash.jpg",
      discriminator: "discriminator",
    },
    joined_at: "2024-03-07T18:46:20.327000+00:00",
  },
};

export const messageRequestMemberMockSuperUser = {
  member: {
    user: {
      id: 154585730465660929n,
      username: "ankush",
      avatar: "https://cdn.discordapp.com/avatars/1/userAvatarHash.jpg",
      discriminator: "discriminator",
    },
    joined_at: "2024-03-07T18:46:20.327000+00:00",
  },
};

export const memberGroupRoleList: memberGroupRole[] = [
  { userid: "XXXX", roleid: "XXXX" },
  { userid: "YYYY", roleid: "YYYY" },
  { userid: "ZZZZ", roleid: "ZZZZ" },
];

export const memberGroupRoleResponseList = [
  { userid: "XXXX", roleid: "XXXX", success: true },
  { userid: "YYYY", roleid: "YYYY", success: true },
  { userid: "ZZZZ", roleid: "ZZZZ", success: true },
];

export const overdueTaskUsers = {
  message: "Users returned successfully!",
  count: 7,
  users: [
    {
      id: "XAF7rSUvk4p0d098qWYS",
      discordId: "154585730465660929",
      username: "ankush",
    },
    {
      id: "C2XUDSTtDooWLJ44iBYr",
      discordId: "875289457589379102",
      username: "vinayak-g",
    },
    {
      id: "DU3gRW3xQY8lRt3DmF6i",
      discordId: "987654321098765432",
      username: "random_user1",
    },
    {
      id: "wH5f1kuYp3vRZydF70sA",
      discordId: "123456789012345678",
      username: "random_user2",
    },
    {
      id: "jV8d5ZbEDJc7Mnq6a2g9",
      discordId: "567890123456789012",
      username: "random_user3",
    },
    {
      id: "qX2zOyB1n7PmIv6TcR8w",
      discordId: "890123456789012345",
      username: "random_user4",
    },
    {
      id: "pY6cVuA2b5sHgNq9fJ3m",
      discordId: "345678901234567890",
      username: "random_user5",
    },
  ],
};
export const testDataWithDevTitle = {
  channelId: 123,
  roleToBeTaggedObj: {
    name: "role",
    type: 4,
    value: "860900892193456149",
  },
  dev_title: {
    name: "dev_title",
    type: 4,
    value: true,
  },
};

export const transformedArgsForOnboardingExtension = {
  memberObj: {
    user: {
      id: 134672111,
      username: "username",
      discriminator: "<discriminator>",
      avatar: "<avatar>",
    },
    nick: "<nick>",
    joined_at: "<joined_at>",
  },
  userIdObj: { name: "userId", type: 6, value: "1545562672", options: [] },
  numberOfDaysObj: { value: "20", name: "numberOfDays", type: 3, options: [] },
  reasonObj: { value: "reason", name: "reason", type: 3, options: [] },
  channelId: 6754321,
  devObj: { value: false, name: "dev", type: 5 },
};
