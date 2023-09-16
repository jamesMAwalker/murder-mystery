"use client";

import { useSession } from "@clerk/nextjs";
import { useUserContext } from "../(context)/user.context";

const UserProfilePage = () => {
  // user data from convex db
  const { user: convexUser } = useUserContext();
  console.log("convexUser: ", convexUser);

  // session data
  const { isLoaded, isSignedIn } = useSession();
  console.log("isLoaded: ", isLoaded);

  function showModal() {
    const dialog = document.getElementById(
      "join-team-modal"
    ) as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
    }
  }

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

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
    <div className="relative bg-slate-800 p-4 sm:p-6 rounded-lg shadow-md">
      {convexUser && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-white text-xl sm:text-2xl font-semibold">
              {convexUser?.name}
            </p>
            <p className="text-white text-base sm:text-lg">
              {convexUser?.email}
            </p>
          </div>

          {convexUser?.has_team ? (
            <div className="flex flex-col gap-4">
              <h2 className="text-white text-lg font-semibold">
                Team: {convexUser?.team_name}
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn btn-primary w-full sm:w-auto">
                  Add Member
                </button>
                <button className="btn btn-accent w-full sm:w-auto">
                  Leave Team
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <h2 className="text-white text-lg font-semibold">
                No team yet...
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <button
                  className="btn btn-primary cursor-pointer w-full sm:w-auto"
                  onClick={showModal}
                >
                  Join Team
                </button>
                <dialog id="join-team-modal" className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">
                      Press ESC key or click on ✕ button to close
                    </p>
                  </div>
                </dialog>
                <button className="btn btn-accent w-full sm:w-auto">
                  Create Team
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  // <div className="relative">
  //   {loggedUser && (
  //       <div className="flex flex-col gap-4 bg-slate-800 p-4 rounded-md shadow-md">
  //         <h1 className="text-white text-2xl">{name}</h1>
  //         <p className="text-white text-xl">{email}</p>

  //         {team_name && team_name !== "No team yet..." ? (
  //           <div className="flex flex-col gap-4">
  //             <h2 className="text-white text-xl">Team: {team_name}</h2>
  //             <button className="btn btn-primary">Add Member</button>
  //             <button className="btn btn-primary">Leave Team</button>
  //           </div>
  //         ) : (
  //           <div className="flex flex-col gap-4">
  //             <h2 className="text-white text-xl">No team yet...</h2>
  //             <button className="btn btn-accent" onClick={showModal}>
  //               Join Team
  //             </button>
  //             <dialog id="my_modal_3" className="modal">
  //               <form method="dialog" className="modal-box">
  //                 <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
  //                   ✕
  //                 </button>
  //                 <h2 className="text-white text-xl">Available Teams</h2>
  //                 <div className="flex flex-col gap-4 pt-6">
  //                   {uniqueTeams.map((team) => (
  //                     <li
  //                       key={team}
  //                       className="flex items-center justify-between p-4 bg-slate-800 gap-2 w-full rounded-md"
  //                     >
  //                       <span className="font-semibold">{team}</span>
  //                       <button className="btn btn-primary">Join</button>
  //                     </li>
  //                   ))}
  //                 </div>
  //               </form>
  //             </dialog>
  //             <button className="btn btn-primary">Create Team</button>
  //           </div>
  //         )}
  //       </div>
  //     )}
  //   </div>
  // );
};

export default UserProfilePage;
