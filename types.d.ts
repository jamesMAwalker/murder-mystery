declare interface IConvexUser {
  _id?: string;
  user_id: string;
  name: string | null | undefined;
  email: string | undefined;
  has_team: boolean;
  team_id: string | null;
  team_name: string | null;
}

declare interface IConvexTeam {
  _id?: string;
  team_captain: string | null;
  team_name: string | null;
  members: string[] | null;
}

declare interface IConvexInvitation {
  invited_user_id: string | null;
  inviting_team_id: string | null;
  accepted: boolean | null;
}

declare interface IConvexRequest {
  requesting_user_id: string | null;
  requested_team_id: string | null;
  accepted: boolean | null;
}
