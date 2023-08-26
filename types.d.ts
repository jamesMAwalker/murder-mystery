declare interface IConvexUser {
  user_id: string;
  name: string | null | undefined;
  email: string | undefined;
  has_team: boolean;
  team_id: string | null;
  team_name: string | null;
}
