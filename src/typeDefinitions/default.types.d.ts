export interface env {
  [key: string]: string;
}

export interface environment {
  [key: string]: variables;
}

export interface variables {
  DASHBOARD_SITE_URL: string;
  RDS_BASE_API_URL: string;
  VERIFICATION_SITE_URL: string;
  TRACKING_CHANNEL_URL: string;
  PROFILE_SERVICE_HELP_GROUP_ID: string;
  RDS_STATUS_SITE_URL: string;
  MAIN_SITE_URL: string;
  DISCORD_ROLE_IDS: typeof DISCORD_ROLE_IDS;
}

export interface discordCommand {
  name: string;
  description: string;
}

export interface responseJson {
  type: number;
  data: {
    content: string;
    flags?: number;
  };
}
