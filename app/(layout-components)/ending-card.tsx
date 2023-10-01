"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export const EndingCard = () => {
  const [visible, setVisible] = useState(false);
  const game = useQuery(api.game.getGameObject);
  const guess = useQuery(api.guesses.getFromSessionByTeam);

  const hardCodedGuess = {
    suspect_id: "55zgs7cfqt63krxvcccggc6e9jmqg38",
    suspect_name: "Myles",
    weapon_id: "0x1",
    weapon_name: "Chloroform",
    location_id: "0x1",
    location_name: "The Study",
  };

  const winningGuess = hardCodedGuess.suspect_id === game?.guilty_suspect_id;

  useEffect(() => {
    if (game) {
      setVisible(game?.concluded);
    }
  }, [game]);

  if (!game?.concluded || !visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-2 bg-red-800 bg-opacity-50 backdrop-blur md:backdrop-blur-lg z-50">
      <div className="w-full max-w-2xl bg-base-100 shadow-xl rounded-lg overflow-y-auto relative mx-2 md:mx-auto my-2 h-[85vh]">
        <img
          src="/den.webp"
          alt="Shoes"
          className="w-full object-cover h-1/3 md:h-1/2"
        />
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-5 text-center">
            And the murderer is...
            <div className="text-red-600 mt-2">{game.guilty_suspect_name}!</div>
          </h2>
          {winningGuess ? (
            <div className="text-green-500 font-bold text-2xl flex items-center justify-center gap-3">
              <FontAwesomeIcon icon={faTrophy} size="2x" />
              Congratulations! You solved the murder!
            </div>
          ) : (
            <div className="text-red-500 font-bold text-2xl flex items-center justify-center gap-3">
              <FontAwesomeIcon icon={faTimesCircle} size="2x" />
              Unfortunately, you did not solve the murder. Better luck next
              time!
            </div>
          )}
          <p className="mt-4 leading-relaxed text-justify">
            {" "}
            {/* Added margin-top and improved line-height */}
            Despite his charismatic and charming persona, Myles had a hidden
            motive. Đen Vâu had discovered Myles&#39;s involvement in a past
            scandal that could have ruined his reputation as a language teacher.
            Fearing the exposure of this secret, Myles used chloroform to subdue
            Đen Vâu during the party, strangled him, then put poison in his
            whiskey after the murder in an attempt to frame his wife (whom he
            had been quarreling with lately).
          </p>
          <div className="flex flex-col items-center mt-6">
            <p className="italic mb-3">Thanks for playing!</p>
            <button
              onClick={() => setVisible(false)}
              className="btn btn-primary mt-2"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
