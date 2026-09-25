import { useEffect, useRef, useState } from "react";
import Card from "../Error/card.jsx";
import "./settings.css";
export default function Settings({difficulty, wordLength: initialWordLength, onSave}) {
     const [settings, setSettings] = useState(false)
     const [wordLength, setWordLength] = useState(initialWordLength ?? 5)
     const [selectedDifficulty, setSelectedDifficulty] = useState(difficulty ?? 5)
     const [alertMessage, setAlertMessage] = useState("");

    const saveSettings = async () => {
        await onSave(selectedDifficulty, wordLength)
        setSettings(false);
        setAlertMessage("Game settings updated successfully.");
    }

    return (
        <>
        <button type="button" onClick={() => setSettings((prev) => !prev)} className='mt-5 p-2 bg-gray-800 text-white rounded hover:bg-gray-600 hover:cursor-pointer'>
            {settings ? "Game Settings" : "Game Settings"}
        </button>
        {settings && (
        <div className="settings-container">   
            <div className="p-5 flex flex-col justify-center items-center" role="dialog" aria-label="Game Settings" aria-modal="true">
                <h2 className='font-bold text-xl'>Game Settings</h2>
                <hr className='w-full border-t border-gray-300 my-4' />
                <details>
                    <summary>Adjust Difficulty</summary>
                    <p>Adjusting the difficulty will change the game's challenge level.</p>
                    <ol className="text-left">
                        <li><span className="font-bold">Easy</span> - Very common words. (e.g., "water", "house")</li>
                        <li><span className="font-bold">Medium-Easy</span> - Common words with occasional difficulty.</li>
                        <li><span className="font-bold">Medium</span> - Words of moderate difficulty.</li>
                        <li><span className="font-bold">Medium-Hard</span> - Words that are challenging and less common.</li>
                        <li><span className="font-bold">Hard</span> - Very challenging and rare words.</li>
                    </ol>
                    <p className="text-left">Choose the difficulty level that best matches your skill and preference.</p>
                </details>
                <select 
                    className='mt-4 p-2 w-20 border border-gray-300 rounded'
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(Number(e.target.value))}
                >
                    <option value="1">Easy</option>
                    <option value="2">Medium-Easy</option>
                    <option value="3">Medium</option>
                    <option value="4">Medium-Hard</option>
                    <option value="5">Hard</option>
                </select>
                <hr className='w-full border-t border-gray-300 my-4' />
                <label htmlFor="Wordlength">Word Length</label>
                <input
                    type="number"
                    id="Wordlength"
                    min="5"
                    max="10"
                    className='mt-2 p-2 w-15 text-center border border-gray-300 rounded'
                    value={wordLength}
                    onChange={(e) => setWordLength(Number(e.target.value))}
                />
                <button type="button" onClick={saveSettings} className='mt-5 p-2 bg-gray-800 text-white rounded hover:bg-gray-600 hover:cursor-pointer'>Save Settings</button>
            </div>
            
        </div>
        )}
        </>
    )
}