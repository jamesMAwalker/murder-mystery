"use client";

import { useUser } from "@clerk/clerk-react";

const UserProfilePage = () => {
  const { user } = useUser();
  console.log("user: ", user?.id);

  function showModal() {
    const dialog = document.getElementById("my_modal_3") as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
    }
  }

  const users: IConvexUser[] = [
    {
      name: "John Doe",
      email: "eee.gmail.com",
      has_team: false,
      team_name: null,
      team_id: null,
      user_id: "1",
    },
    {
      name: "Jane Doe",
      email: "eee.gmail.com",
      has_team: false,
      team_name: null,
      team_id: null,
      user_id: "2",
    },
    {
      name: "Krispy Kris",
      email: "krisp.gmail.com",
      has_team: true,
      team_name: "Bozos",
      team_id: "1",
      user_id: "3",
    },
    {
      name: "Meatball Rob",
      email: "meatball.gmail.com",
      has_team: true,
      team_name: "Bozos",
      team_id: "1",
      user_id: "4",
    },
    {
      name: "Tim Bozo",
      email: "timbozo.gmail.com",
      has_team: true,
      team_name: "Idiots",
      team_id: "2",
      user_id: "5",
    },
    {
      name: "Mike Penis",
      email: "mikep@gmail.com",
      has_team: true,
      team_name: "seniles",
      team_id: "3",
      user_id: "6",
    },
    {
      name: "Vivieee Swamii",
      email: "viv@gmail.com",
      has_team: true,
      team_name: "neo-boneheads",
      team_id: "4",
      user_id: "7",
    },
    {
      email: "joshsmayhew@gmail.com",
      name: "Joshua Mayhew",
      has_team: true,
      team_name: "No team yet...",
      team_id: "5",
      user_id: "user_2UWZ2MFETBoJZCYShYpS3HzmZo2",
    },
  ];

  const teamsSet = new Set(
    users
      .map((user) => user.team_name)
      .filter((team) => team !== "No team yet..." && team !== null)
  );

  const uniqueTeams = Array.from(teamsSet);
  console.log("uniqueTeams: ", uniqueTeams);

  const loggedUser = users.find((u) => u.user_id === user?.id);

  if (!loggedUser) {
    return (
      <div>
        <h2>Loading</h2>
      </div>
    );
  }

  const { name, email, team_name, user_id } = loggedUser;
  /*
    * User Profile UI Elements
    # User Info: Should show user's: name, email, team name (if on team).
    # Action Buttons:
    - If not on team: Should show buttons: Join Team, Create Team
      > Each of these opens a dropdown with a list of joinable teams (not full).
    - If on team: Should show buttons: Add Member, Leave Team
      > Add member shows a dropdown with a list of unattached participants.

    # If you think of anything else, feel free to add!
  */

  return (
    <div className="relative">
      {loggedUser && (
        <div className="flex flex-col gap-4 bg-slate-800 p-4 rounded-md shadow-md">
          <h1 className="text-white text-2xl">{name}</h1>
          <p className="text-white text-xl">{email}</p>

          {team_name && team_name !== "No team yet..." ? (
            <div className="flex flex-col gap-4">
              <h2 className="text-white text-xl">Team: {team_name}</h2>
              <button className="btn btn-primary">Add Member</button>
              <button className="btn btn-primary">Leave Team</button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <h2 className="text-white text-xl">No team yet...</h2>
              <button className="btn" onClick={showModal}>
                Join Team
              </button>
              <dialog id="my_modal_3" className="modal">
                <form method="dialog" className="modal-box">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                  <h2 className="text-white text-xl">Available Teams</h2>
                  <div className="flex flex-col gap-4 pt-6">
                    {uniqueTeams.map((team) => (
                      <li
                        key={team}
                        className="flex items-center justify-between p-4 bg-slate-800 gap-2 w-full rounded-md"
                      >
                        <span className="font-semibold">{team}</span>
                        <button className="btn btn-primary">Join</button>
                      </li>
                    ))}
                  </div>
                </form>
              </dialog>
              <button className="btn btn-primary">Create Team</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
