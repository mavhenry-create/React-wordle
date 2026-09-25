import React from 'react';
import './gamemodal.css';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';

export default function GameModal({ isCorrect, turn}) {
    const { user } = useAuth();
    const navigate = useNavigate();
    const handleClick = () => navigate(0); 
    return (
        <div className='game-modal' role="dialog" aria-modal="true" aria-labelledby="game-modal-title" aria-describedby="game-modal-description">
            
            {user && isCorrect && (
                <div>
                <h2 id="game-modal-title" className='text-2xl font-bold mb-1'>Congratulations!</h2>
                <p id="game-modal-description">You guessed the word in {turn} {turn === 1 ? 'turn' : 'turns'}</p>
                <hr className='my-4' />
                
                <button
                type="button"
                className='text-blue-500 hover:pointer-fine:cursor-pointer'
                onClick={handleClick}>Play again?</button>
                </div>
            )} 
            {user && !isCorrect && (
                <div>
                <h2 id="game-modal-title" className='text-2xl font-bold mb-1'>Game Over!</h2>
                <p id="game-modal-description">Better luck next time.</p>
                <hr className='my-4' />
                <p></p>
                <button type="button" className='text-blue-500 hover:pointer-fine:cursor-pointer' onClick={handleClick}>Play again?</button>
                </div>
            )}
            {!user && isCorrect && (
                <div>
                <h2 id="game-modal-title" className='text-2xl font-bold mb-1'>Congratulations!</h2>
                <p id="game-modal-description">You guessed the word in {turn} {turn === 1 ? 'turn' : 'turns'}</p>
                <hr className='my-4' />
                <h3>Want to play again?</h3>
                <p>Sign up to save your progress and compete with others!</p>
                <button
                type="button"
                className='text-blue-500 hover:pointer-fine:cursor-pointer'
                onClick={() => {
                  const returnTo = encodeURIComponent("http://localhost:5173/");

                  window.location.href = `http://localhost:3000/auth/login?screen_hint=signup&returnTo=${returnTo}`;
                }}>Sign up</button>
                </div>
            )}
            {!user && !isCorrect && (
                <div>
                <h2 id="game-modal-title" className='text-2xl font-bold mb-1'>Game Over!</h2>
                <p id="game-modal-description">Better luck next time.</p>
                <hr className='my-4' />
                <h3>Want to play again?</h3>
                <p>Sign up to save your progress and compete with others!</p>
                <button type="button" className='text-blue-500 hover:pointer-fine:cursor-pointer' onClick={() => {
                  const returnTo = encodeURIComponent("http://localhost:5173/");

                  window.location.href = `http://localhost:3000/auth/login?screen_hint=signup&returnTo=${returnTo}`;
                }}>Sign up</button>
                </div>
            )}
    </div>
    );
}