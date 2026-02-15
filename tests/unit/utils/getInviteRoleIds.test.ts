import { DISCORD_ROLE_IDS } from "../../../src/constants/discordRoles";
import { getInviteRoleId } from "../../../src/utils/getInviteRoleIds";

const APPLICATION_ROLE_KEYS: Record<
  string,
  keyof typeof DISCORD_ROLE_IDS.STAGING
> = {
  developer: "DEVELOPER",
  designer: "DESIGNER",
  product_manager: "PRODUCT_MANAGER",
  project_manager: "PROJECT_MANAGER",
  qa: "QA",
  social_media: "SOCIAL_MEDIA",
};

const stagingEnv = { CURRENT_ENVIRONMENT: "staging" };
const productionEnv = { CURRENT_ENVIRONMENT: "production" };
const defaultEnv = { CURRENT_ENVIRONMENT: "default" };

describe("getInviteRoleIds", () => {
  describe("when role is missing or invalid", () => {
    it("throws when role is undefined", () => {
      expect(() =>
        getInviteRoleId(undefined as unknown as string, stagingEnv)
      ).toThrow("Role is required");
    });

    it("throws when role is empty string", () => {
      expect(() => getInviteRoleId("", stagingEnv)).toThrow("Role is required");
    });

    it("throws when role is whitespace only", () => {
      expect(() => getInviteRoleId("   ", stagingEnv)).toThrow(
        "Role is required"
      );
    });

    it("throws when role is unknown", () => {
      expect(() => getInviteRoleId("unknown_role", stagingEnv)).toThrow(
        "Invalid role: unknown_role"
      );
    });
  });

  describe("when role is valid", () => {
    it("returns staging role ID for valid role in staging env", () => {
      const result = getInviteRoleId("developer", stagingEnv);
      expect(result).toBe(DISCORD_ROLE_IDS.STAGING.DEVELOPER);
    });

    it("returns production role ID for valid role in production env", () => {
      const result = getInviteRoleId("developer", productionEnv);
      expect(result).toBe(DISCORD_ROLE_IDS.PRODUCTION.DEVELOPER);
    });

    it("returns development role ID when CURRENT_ENVIRONMENT is default", () => {
      const result = getInviteRoleId("designer", defaultEnv);
      expect(result).toBe(DISCORD_ROLE_IDS.DEVELOPMENT.DESIGNER);
    });

    it("normalizes role to lowercase (case-insensitive)", () => {
      const result = getInviteRoleId("Developer", stagingEnv);
      expect(result).toBe(DISCORD_ROLE_IDS.STAGING.DEVELOPER);
    });

    it("trims whitespace from role", () => {
      const result = getInviteRoleId("  developer  ", stagingEnv);
      expect(result).toBe(DISCORD_ROLE_IDS.STAGING.DEVELOPER);
    });

    it("returns correct ID for each of the 6 application roles (staging)", () => {
      for (const [role, key] of Object.entries(APPLICATION_ROLE_KEYS)) {
        const result = getInviteRoleId(role, stagingEnv);
        expect(result).toBe(DISCORD_ROLE_IDS.STAGING[key]);
      }
    });
  });
});
