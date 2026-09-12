import React from 'react';

export default function GameModal({ isCorrect, turn }) {
    return (
        <div className='game-modal'>
            {isCorrect ? (
                <div>
                <h2>Congratulations!</h2>
                <p>You guessed the word in {turn} turns!</p>
                </div>
            ) : (
                <div>
                <h2>Game Over!</h2>
                <p>Better luck next time.</p>
                </div>
            )}
        </div>
    );
}