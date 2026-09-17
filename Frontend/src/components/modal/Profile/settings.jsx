import { useEffect, useRef, useState } from "react";
import Card from "../Error/card.jsx";
import "./settings.css";
export default function Settings({difficulty, onSave}) {
     const [settings, setSettings] = useState(false)
     const [selected, setSelected] = useState(difficulty ?? 5)
    const saveSettings = async () => {
        await onSave(selected)
        setSettings(false);
    }

    return (
        <>
        <button onClick={() => setSettings((prev) => !prev)} className='mt-5 p-2 bg-gray-800 text-white rounded hover:bg-gray-600'>
            {settings ? "Game Settings" : "Game Settings"}
        </button>
        {settings && (
        <div className="settings-container">   
            <div className="p-5 flex flex-col justify-center items-center">
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
                    value={selected}
                    onChange={(e) => setSelected(Number(e.target.value))}
                >
                    <option value="1">Easy</option>
                    <option value="2">Medium-Easy</option>
                    <option value="3">Medium</option>
                    <option value="4">Medium-Hard</option>
                    <option value="5">Hard</option>
                </select>
                <button onClick={saveSettings} className='mt-5 p-2 bg-gray-800 text-white rounded hover:bg-gray-600'>Save Settings</button>
            </div>
            
        </div>
        )}
        </>
    )
}