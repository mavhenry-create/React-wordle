import React from 'react';
import './gamemodal.css';

import { useNavigate } from 'react-router-dom';

export default function GameModal({ isCorrect, turn}) {
    const navigate = useNavigate();
    const handleClick = () => navigate(0); 
    return (
        <div className='game-modal'>
            
            {isCorrect && (
                <div>
                <h2>Congratulations!</h2>
                <p>You guessed the word in {turn} turns!</p>
                <hr className='my-4' />
                <p>Play again?</p>
                <button
                className='text-blue-500 hover:pointer-fine:cursor-pointer'
                onClick={handleClick}>Click here.</button>
                </div>
            )}
            {!isCorrect && (
                <div>
                <h2>Game Over!</h2>
                <p>Better luck next time.</p>
                <hr className='my-4' />
                <p>Play again?</p>
                <button className='text-blue-500 hover:pointer-fine:cursor-pointer' onClick={handleClick}>Click here.</button>
                </div>
            )}
        </div>
    );
}