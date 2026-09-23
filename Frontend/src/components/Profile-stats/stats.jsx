import { useState } from "react";

const TABS = ["Overview", "By Difficulty", "By Word Length", "Records"];

export default function Stats({ stats }) {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="profile-stats w-1/3 h-80 flex flex-col p-3 bg-white border border-gray-300 text-center rounded-lg shadow-lg">
      <h2 className="font-bold text-2xl mb-4">Statistics</h2>
       <hr className='w-full border-t border-gray-300'/>
      <div className="flex justify-center gap-5 m-4">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? "font-bold underline" : ""}
          >
            {tab}
          </button>
        ))}
        
      </div>
        <hr className='w-full border-t border-gray-300'/>
      {activeTab === "Overview" && (
        <div>
          <p className="mb-2">Games played: {stats.games_played}</p>
          <p className="mb-2">Wins: {stats.wins}</p>
          <p className="mb-2">Total guesses: {stats.total_guesses}</p>
          <p className="mb-2"   >Streak: {stats.streak}</p>
        </div>
      )}

      {activeTab === "By Difficulty" && (
        <table>
          <tbody>
            {stats.byDifficulty.map((row) => (
              <tr key={row.difficulty}>
                <td>Difficulty {row.difficulty}</td>
                <td>{row.wins}/{row.games_played} wins</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {activeTab === "By Word Length" && (
        <table>
          <tbody>
            {stats.byWordLength.map((row) => (
              <tr key={row.word_length}>
                <td>{row.word_length} letters</td>
                <td>{row.wins}/{row.games_played} wins</td>
                <td>avg {row.avg_guesses} guesses</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {activeTab === "Records" && (
        <div>
          <p>Hardest word solved: {stats.hardestWord?.solution ?? "—"}</p>
          <p>Longest word solved: {stats.longestWord?.solution ?? "—"}</p>
        </div>
      )}
    </div>
  );
}