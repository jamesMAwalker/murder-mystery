import { useUserContext } from "../(context)/user.context";

export const TeamButtons: React.FC = () => {
  const { loggedUser, showProfileModal } = useUserContext();

  const hasTeam = loggedUser?.has_team;
  const team = loggedUser?.team_name;

  if (hasTeam === null || hasTeam === undefined) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-white text-lg font-semibold">Loading...</h2>
      </div>
    );
  }

  if (hasTeam) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-white text-lg font-semibold">Team: {team}</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="btn btn-primary w-full sm:w-auto">
            Add Member
          </button>
          <button className="btn btn-accent w-full sm:w-auto">
            Leave Team
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-white text-lg font-semibold">No team yet...</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="btn btn-primary cursor-pointer w-full sm:w-auto"
            onClick={() => showProfileModal("join-team-modal")}
          >
            Join Team
          </button>
          <button
            className="btn btn-accent w-full sm:w-auto"
            onClick={() => showProfileModal("create-team-modal")}
          >
            Create Team
          </button>
        </div>
      </div>
    );
  }
};
