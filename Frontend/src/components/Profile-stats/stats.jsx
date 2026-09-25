import { useState } from "react";
import { DIFFICULTIES } from "../../constants/difficulty.js";
const TABS = ["Overview", "Difficulty", "Word Length"];

export default function Stats({ stats }) {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="profile-stats  h-84 flex flex-col p-2 bg-white border border-gray-300 text-center rounded-lg shadow-lg">
      <h2 className="font-bold text-2xl mb-4">Statistics</h2>
       <hr className='w-full border-t border-gray-300'/>
      <div className="flex justify-center gap-5 m-4">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? "underline bg-gray-800 text-white p-2 rounded hover:bg-gray-700" : "bg-gray-800 text-white p-2 rounded hover:bg-gray-700 hover:cursor-pointer"}
          >
            {tab}
          </button>
        ))}
        
      </div>
        <hr className='w-full border-t border-gray-300'/>
      {activeTab === "Overview" && (
        <div className="overview-tab gap-1 flex flex-col p-4">
          <p className="m-1 text-xl font-semibold text-left">Games played: {stats.games_played}</p>
          <p className="m-1 text-xl  font-semibold text-left">Boards Completed: {stats.wins}</p>
          <p className="m-1 text-xl font-semibold text-left">Total guesses: {stats.total_guesses}</p>
          <p className="m-1 text-xl font-semibold text-left">Streak: {stats.streak}</p>
        </div>
      )}

      {activeTab === "Difficulty" && (
        <table className="m-5 border-separate ">
          <tbody>
            {stats.byDifficulty.map((row) => (
              <tr key={row.difficulty} className="text-center">               
                <td className="text-left mx-auto font-semibold text-lg">{DIFFICULTIES[row.difficulty]}</td>
                <td className="text-lg font-bold">{row.wins}/{row.games_played} wins</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {activeTab === "Word Length" && (
        <table className="">
          <tbody>
            {stats.byWordLength.map((row) => (
              <tr className='' key={row.word_length}>
                <td className="p-1 font-bold">{row.word_length} letters</td>
                <td className="p-1 font-bold ">{row.wins}/{row.games_played} wins</td>
                <td className="p-1 font-bold">avg {row.avg_guesses} guesses</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}


    </div>
  );
}