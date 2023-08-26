declare interface IConvexUser {
  user_id: string;
  name: string | null | undefined;
  email: string | undefined;
  has_team: boolean;
  team_id: string | null;
  team_name: string | null;
}

declare interface IConvexTeam {
  team_captain: string;
  team_name: string;
  members: string[];
}

declare interface IConvexInvitation {
  invited_user_id: string;
  inviting_team_id: string;
  accepted: boolean;
}

declare interface IConvexRequest {
  requesting_user_id: string;
  requested_team_id: string;
  accepted: boolean;
}